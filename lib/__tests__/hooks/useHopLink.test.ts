import { renderHook } from "@testing-library/react";
import { useHopLink } from "@/lib/hooks/useHopLink";

// Mock window.location.search
const originalLocation = window.location;

describe("useHopLink", () => {
  beforeEach(() => {
    // Reset window.location.search before each test
    delete (window as any).location;
    (window as any).location = { ...originalLocation, search: "" };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  it("should return base link when no UTM parameters are present", () => {
    (window as any).location.search = "";
    const baseLink = "https://example.hop.clickbank.net";
    const { result } = renderHook(() => useHopLink(baseLink));
    expect(result.current).toBe(baseLink);
  });

  it("should append traffic_source and campaign parameters", () => {
    (window as any).location.search = "?utm_source=youtube&utm_campaign=test-campaign";
    const baseLink = "https://example.hop.clickbank.net";
    const { result } = renderHook(() => useHopLink(baseLink));
    const url = new URL(result.current);
    expect(url.searchParams.get("traffic_source")).toBe("youtube");
    expect(url.searchParams.get("campaign")).toBe("test-campaign");
  });

  it("should use 'unknown' as default for missing utm_source and utm_campaign", () => {
    (window as any).location.search = "";
    const baseLink = "https://example.hop.clickbank.net";
    const { result } = renderHook(() => useHopLink(baseLink));
    const url = new URL(result.current);
    expect(url.searchParams.get("traffic_source")).toBe("unknown");
    expect(url.searchParams.get("campaign")).toBe("unknown");
  });

  it("should map utm_medium to traffic_type", () => {
    (window as any).location.search = "?utm_source=youtube&utm_campaign=test&utm_medium=organic";
    const baseLink = "https://example.hop.clickbank.net";
    const { result } = renderHook(() => useHopLink(baseLink));
    const url = new URL(result.current);
    expect(url.searchParams.get("traffic_type")).toBe("organic");
  });

  it("should map utm_term to ad and utm_content to creative", () => {
    (window as any).location.search =
      "?utm_source=youtube&utm_campaign=test&utm_term=banner-v1&utm_content=blue";
    const baseLink = "https://example.hop.clickbank.net";
    const { result } = renderHook(() => useHopLink(baseLink));
    const url = new URL(result.current);
    expect(url.searchParams.get("ad")).toBe("banner-v1");
    expect(url.searchParams.get("creative")).toBe("blue");
  });
});

