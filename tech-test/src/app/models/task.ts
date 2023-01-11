export interface Task {
    id: string,
    label: string,
    description: string,
    category: string,
    done: boolean | Date
}
