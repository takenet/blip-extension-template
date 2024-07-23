import { Pill } from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import type { Contact } from 'blip-iframe';
import { array, string } from 'zod';

const tenantsSchema = array(string());

function getTenants(str: string) {
  try {
    return tenantsSchema.parse(JSON.parse(str)).filter(Boolean);
  } catch {
    return [];
  }
}

export function TenantsCellRenderer({ data }: ICellRendererParams<Contact>) {
  if (!data?.extras?.lastUsedTenants) {
    return null;
  }

  const tenants = getTenants(data.extras.lastUsedTenants as string);

  return (
    <div className="flex h-[41px] flex-wrap items-center gap-0.5 overflow-hidden">
      {tenants.map((tenant) => (
        <Pill
          key={tenant}
          className="dark:bg-dark-5"
          h={18}
          classNames={{ label: 'h-[unset]' }}
        >
          {tenant}
        </Pill>
      ))}
    </div>
  );
}
