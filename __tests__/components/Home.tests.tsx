import { render, screen } from "@testing-library/react";
import Home from "@/page";
import { Providers } from "../__helpers__/mock-providers";

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        name: "Test User",
        email: "test@example.com",
      },
      expires: "fake-expiration",
    },
    status: "authenticated",
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Home Page", () => {
  it("renders page title", () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
});
