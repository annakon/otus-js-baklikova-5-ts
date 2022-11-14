import { Game } from "./Game";
import "./styles.css";

const el = document.getElementById("app") as HTMLElement;

new Game(el, 5,5, 1000);
