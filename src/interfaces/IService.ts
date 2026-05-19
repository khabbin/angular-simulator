import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IService {
  id: number;
  icon: IconDefinition;
  bgColor: string;
  name: string;
  description: string;
}