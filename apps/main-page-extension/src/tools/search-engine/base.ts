export abstract class Base {

    public abstract doSearch(query: string): void

    public abstract fetchPreviewList(query: string): Promise<string[]>
}