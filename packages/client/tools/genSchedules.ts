import select, { Separator } from "@inquirer/select";

const action = await select({
  message: "Select an Action",
  choices: [
    {
      name: "Create New Race",
      value: "createRace",
      description: "Create a race",
    },
    {
      name: "Edit Existing Race",
      value: "editRace",
      description: "Edit the value of a race",
    },
  ],
});

async function createNewRace() {}

if (action == "createRace") {
  await createNewRace();
}
