import * as Tabs from '@radix-ui/react-tabs';

const Tab = () => {
  return (
    <Tabs.Root defaultValue="tab1" orientation="vertical">
      <Tabs.List aria-label="tabs example" className="mb-4 flex gap-6 border-b border-border-primary">
        <Tabs.Trigger
          className="py-3 text-label-large text-content-secondary data-[state=active]:border-b-[3px] data-[state=active]:border-secondary data-[state=active]:text-content-primary"
          value="tab1"
        >
          내 콘텐츠
        </Tabs.Trigger>
        <Tabs.Trigger
          className="py-3 text-label-large text-content-secondary data-[state=active]:border-b-[3px] data-[state=active]:border-secondary data-[state=active]:text-content-primary"
          value="tab2"
        >
          회원목록
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Tab one content</Tabs.Content>
      <Tabs.Content value="tab2">Tab two content</Tabs.Content>
    </Tabs.Root>
  );
};

interface TabRootProps extends Tabs.TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

const TabRoot = ({ defaultValue, children, ...props }: TabRootProps) => {
  return (
    <Tabs.Root defaultValue={defaultValue} {...props} orientation="vertical">
      {children}
    </Tabs.Root>
  );
};

interface TabListProps {
  children: React.ReactNode;
}
const TabList = ({ children }: TabListProps) => {
  return (
    <Tabs.List aria-label="tabs" className="mb-4 flex gap-6 border-b border-border-primary">
      {children}
    </Tabs.List>
  );
};

interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
}
const TabTrigger = ({ value, children }: TabTriggerProps) => {
  return (
    <Tabs.Trigger
      value={value}
      className="py-3 text-label-large text-content-secondary data-[state=active]:border-b-[3px] data-[state=active]:border-secondary data-[state=active]:text-content-primary"
    >
      {children}
    </Tabs.Trigger>
  );
};

interface TabContentProps {
  value: string;
  children: React.ReactNode;
}
const TabContent = ({ value, children }: TabContentProps) => {
  return <Tabs.Content value={value}>{children}</Tabs.Content>;
};

export { TabRoot, TabList, TabTrigger, TabContent };
