### Events

## How to add a new Event


### Define the event subject
Define the event subject on the `Subjects` enum in `subjects.ts`. The key is the event name in PascalCase and the value is in the form of `resource:action` in lowercase.
```ts
export enum Subjects {
  ...
  // Example
  TicketEvaporated = 'ticket:evaporated',
}
```

### Create an event file
Create a new file with the event name in kebab-case in the `events` folder. The file should export all the interfaces and classes that are defined in the following steps.
```bash
$ touch events/ticket-evaporated.ts
```
Import the required dependencies
```ts
// events/ticket-evaporated.ts
import { Listener, Publisher } from './base';
import { Subjects } from './subjects';
```

### Define the event data
Define the interfaces for the event and event data so that the event data is strongly typed. The event interface should have a `subject` property that matches the `Subjects` enum property created earlier and a `data` property of type `<Resource><Action>EventData`. 
```ts
// events/ticket-evaporated/event.ts
import { Subjects } from '../subjects';

export interface TicketEvaporatedEvent {
  subject: Subjects.TicketEvaporated;
  data: TicketEvaporatedEventData;
}

export interface TicketEvaporatedEventData {
  id: string;
  version: number;
}
```

### Define the event publisher
Define a class that extends `Publisher` from `@tixit/common`. The class should have a `subject` property of type `Subjects` and a `publish` method that takes an `EventData` object and returns a `Promise<void>`. The `subject` property should be imported from `subjects.ts`. The `publish` method should call the `publish` method of the `Publisher` class with the `EventData` object.

```ts
// events/ticket-evaporated/publisher.ts
import { Publisher, Subjects, TicketEvaporatedEventData } from '../base';

export class TicketEvaporatedPublisher extends Publisher<TicketEvaporatedEventData> {
  subject: Subjects.TicketEvaporated = Subjects.TicketEvaporated;
}
```
### Define the event listener
Define a class that extends `Listener`.
