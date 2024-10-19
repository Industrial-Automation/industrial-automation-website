export const trimUrl = (link: string, paramsToKeep: number) =>
  '/' + link.split('/').filter(Boolean).slice(0, paramsToKeep).join('/');
