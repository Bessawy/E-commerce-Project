import { newUserAvatar } from "../../Pages/utils";
import { createUser, UserLogin } from "../../redux/reducers/userReducer";
import { createStore } from "../../redux/store";
import { CreateUserType } from "../../Types/user";
import server from "../shared/server";


let customStore: any;

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  customStore = createStore();
});


describe("Test user actions", () => {
  test("should be the initial state", async () => {
    expect(customStore.getState().userReducer.id).toBe(0);
  });

  test("should login", async () => {
    await customStore.dispatch(
      UserLogin({ email: "john@mail.com", password: "changeme" })
    );
    expect(customStore.getState().userReducer.id).toBe(1);
  });

  test("should create User",async () => {
    const newUser: CreateUserType = {
        name: "Alaa",
        email: "alaa@mail.com",
        password: "12345",
        avatar: new URL(newUserAvatar)
    }
    await customStore.dispatch(createUser(newUser))
    expect(customStore.getState().userReducer.name).toBe("Alaa")

  })
});
