import {
  getContacts,
  getTickets,
  getContact,
  type Contact,
  type ResponseSuccess,
  type GetTicketsItem,
  type GetContactsItem,
} from 'blip-iframe';

function getMissingContactsTickets(
  tickets: GetTicketsItem[],
  contacts: GetContactsItem[],
) {
  return tickets.filter(
    (item) => !contacts.some((c) => c.identity === item.customerIdentity),
  );
}

export async function queryFn() {
  const [response, contactsResponse] = await Promise.all([
    getTickets({ take: 100, skip: 0 }),
    getContacts({ take: 100, skip: 0 }),
  ]);

  if (!contactsResponse.success) throw contactsResponse.error;
  if (!response.success) {
    throw response.error;
  }

  const tickets = response.data.items;
  const contacts = contactsResponse.data.items;

  for (let index = 1; index <= 4; index++) {
    const missingContactsTickets = getMissingContactsTickets(tickets, contacts);

    const hasMore = contacts.length === 100 * index;

    if (missingContactsTickets.length === 0 || !hasMore) {
      break;
    }

    const newContacts = await getContacts({ take: 100, skip: 100 * index });

    if (!newContacts.success) {
      break;
    }

    newContacts.data.items.forEach((c) => contacts.push(c));
  }

  const missingContactsTickets = tickets.filter(
    (item) => !contacts.some((c) => c.identity === item.customerIdentity),
  );

  const missingContactsRequests = await Promise.allSettled(
    missingContactsTickets.map((_ticket) =>
      getContact({ identity: _ticket.customerIdentity }),
    ),
  );

  const missingContacts = missingContactsRequests
    .filter(
      (promise) => promise.status === 'fulfilled' && promise.value.success,
    )
    .map(
      (promise) =>
        (promise as PromiseFulfilledResult<ResponseSuccess<Contact>>).value
          .data,
    );

  return response.data.items.map((item) => ({
    contact:
      contactsResponse.data.items.find(
        (c) => c.identity === item.customerIdentity,
      ) ?? missingContacts.find((c) => c.identity === item.customerIdentity),
    ...item,
  }));
}
