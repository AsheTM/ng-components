
export type TDialogRootConfiguration = {
  color: Record<'text' | 'background', TDialogRootConfigurationColor>;
};

export type TDialogRootConfigurationColor = Partial<{
  main: string;
  primary: string;
  secondary: string;
}>;
