import { AgentOutline, ContactOutline } from '@blip-ds/react-icons';
import {
  Avatar,
  AvatarGroup,
  Button,
  Checkbox,
  CheckboxCard,
  CheckboxIndicator,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Text,
} from '@mantine/core';
import { CheckboxGroup } from 'react-hook-form-mantine';

export function ExpandButton() {
  return (
    <Popover>
      <PopoverTarget>
        <Button
          size="xs"
          type="button"
          variant="outline"
          color="gray"
          leftSection={<Checkbox size="xs" radius="sm" />}
          rightSection={
            <AvatarGroup spacing="xs">
              <Avatar size="sm" src="image.png">
                <AgentOutline size="80%" />
              </Avatar>
              <Avatar size="sm" src="image.png">
                <ContactOutline size="80%" />
              </Avatar>
              <Avatar size="sm" src="image.png">
                <ContactOutline size="80%" />
              </Avatar>
            </AvatarGroup>
          }
        >
          Expandir dados
        </Button>
      </PopoverTarget>
      <PopoverDropdown>
        <CheckboxGroup
          name="packages"
          label="Pick packages to install"
          description="Choose all packages that you will need in your application"
        >
          <div className="flex flex-col gap-xs pt-md">
            <CheckboxCard
              className="relative overflow-hidden bg-gray-0 p-md transition-colors data-[checked]:border-primary-filled dark:bg-dark-6"
              radius="md"
            >
              <div className="flex flex-nowrap gap-md">
                <CheckboxIndicator size="md" />
                <div>
                  <Text>item.name</Text>
                  <Text>item.description</Text>
                </div>
                <AgentOutline className="absolute -bottom-4 -right-4 size-24 text-dark-4" />
              </div>
            </CheckboxCard>
          </div>
        </CheckboxGroup>
      </PopoverDropdown>
    </Popover>
  );
}
