import type { Patient } from "../types";
import { httpGet } from "./http";

export async function getPatients(): Promise<Patient[]> {
  return httpGet<Patient[]>("/users");
}
