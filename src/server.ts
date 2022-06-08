import { config } from "dotenv";
import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import PostController from "./post/post.controller";
import UserController from "./user/user.controller";
import RecipeController from "./recipe/recipe.controller";
import validateEnv from "./utils/validateEnv";
import furdozokController from "./furdozok/furdozok.controller";
import helyisegekController from "./helyisegek/helyisegek.controller";

config(); // Read and set variables from .env file.
validateEnv();

const app = new App([new PostController(), new AuthenticationController(), new UserController(), new RecipeController(), new furdozokController(), new helyisegekController()]);

app.listen();
