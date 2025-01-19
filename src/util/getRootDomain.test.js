import { getRootDomain } from "@/util/getRootDomain.js";
import { test, expect } from "vitest";

test("returns root domain", () => {
  expect(getRootDomain("dotaclassic.ru")).toEqual(".dotaclassic.ru");
  expect(getRootDomain("wiki.dotaclassic.ru")).toEqual(".dotaclassic.ru");
  expect(getRootDomain("localhost")).toEqual("localhost");
});
