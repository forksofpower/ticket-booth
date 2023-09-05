import { Ticket } from "../ticket";

describe("Ticket Model", () => {
  it("implements optimistic concurrency control", async () => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
      title: "concert",
      price: 5,
      userId: "123456",
    });
    // Save the ticket to the database
    await ticket.save();
    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);
    // make two seperate changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });
    // save the first fetched ticket
    await firstInstance!.save();
    // save the second fetched ticket and expect an error
    try {
      await secondInstance!.save();
    } catch (e) {
      return;
    }
    throw new Error("test failed");
  });
  it("increments the version number on multiple saves", async () => {
    const ticket = Ticket.build({
      title: "concert",
      price: 20,
      userId: "12343",
    });
    for (let i = 0; i <= 5; i++) {
      await ticket.save();
      expect(ticket.version).toEqual(i);
    }
  });
});
