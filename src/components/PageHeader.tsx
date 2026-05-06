interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader = ({ title, description, action }: Props) => (
  <div className="flex items-start justify-between gap-4 mb-8">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
    {action}
  </div>
);