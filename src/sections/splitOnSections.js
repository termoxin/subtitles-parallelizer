import { compose } from "ramda";
import { stripTags } from "../helpers/general/string";
import { splitOnObjectSections } from "./splitOnObjectSections";

export const splitOnSections = compose(splitOnObjectSections, stripTags);
