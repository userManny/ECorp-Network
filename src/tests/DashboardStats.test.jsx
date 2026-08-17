import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, test, expect, afterEach } from "vitest";

import DashboardStats from "../Components/DashboardStats/DashboardStats";


describe("DashboardStats", () => {

  afterEach(() => {
    cleanup();
  });


  const users = [
    {
      id: 1,
      name: "Walter",
      bill: 1500,
      paid: true
    },
    {
      id: 2,
      name: "Elliot",
      bill: 2500,
      paid: false
    }
  ];


  test("displays total number of users", () => {

    render(<DashboardStats users={users} />);

    expect(
      screen.getByText("TOTAL USERS")
    ).toBeInTheDocument();

    expect(
      screen.getByText("2")
    ).toBeInTheDocument();

  });


  test("displays total revenue", () => {

    render(<DashboardStats users={users} />);

    expect(
      screen.getByText("TOTAL REVENUE")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₹4,000")
    ).toBeInTheDocument();

  });


  test("displays pending amount", () => {

    render(<DashboardStats users={users} />);

    expect(
      screen.getByText("PENDING AMOUNT")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₹2,500")
    ).toBeInTheDocument();

  });

});