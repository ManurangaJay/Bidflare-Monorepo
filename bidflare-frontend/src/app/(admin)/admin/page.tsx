"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authFetch } from "../../../../lib/authFetch";
import ThemeToggle from "@/components/ThemeToggle";

// --- Type Definitions ---

interface User {
  id: string;

  name: string;
  email: string;
  role: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  status: string; // DRAFT, LISTED, SOLD, PAID, SHIPPED, DELIVERED
  sellerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface Auction {
  id: string;
  productId: string;
  lastPrice: number | null;
  endTime: string;
}

type AdminData = User | Product | Auction;

const AdminDashboard = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // --- State Management ---
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  // Filter State
  const [userRole, setUserRole] = useState("BUYER");
  const [productStatus, setProductStatus] = useState("DRAFT");
  const [auctionIsClosed, setAuctionIsClosed] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    fetchData();
  }, [activeTab, userRole, productStatus, auctionIsClosed, page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
      });

      switch (activeTab) {
        case "users":
          endpoint = `admin/users`;
          params.append("role", userRole);
          break;
        case "products":
          endpoint = `admin/products`;
          params.append("status", productStatus);
          break;
        case "auctions":
          endpoint = `admin/auctions`;
          params.append("isClosed", String(auctionIsClosed));
          break;
        default:
          setLoading(false);
          return;
      }

      const url = `${endpoint}?${params.toString()}`;
      const response = await authFetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // Handle Spring Boot Page vs List structure
      let content = [];
      let total = 0;

      if (Array.isArray(responseData)) {
        content = responseData;
        total = 1;
      } else if (responseData.content && Array.isArray(responseData.content)) {
        content = responseData.content;
        total = responseData.totalPages;
      } else if (responseData.data && Array.isArray(responseData.data)) {
        content = responseData.data;
        total = responseData.totalPages || 1;
      }

      setData(content);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(0);
    setData([]);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // --- Render Helpers ---
  const renderFilters = () => {
    return (
      <div className="mb-6 flex items-center gap-4 bg-card p-4 rounded-lg shadow-sm border border-border">
        <span className="font-semibold text-muted-foreground">Filter By:</span>

        {activeTab === "users" && (
          <select
            value={userRole}
            onChange={(e) => {
              setUserRole(e.target.value);
              setPage(0);
            }}
            className="border bg-input border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="BUYER">Buyers</option>
            <option value="SELLER">Sellers</option>
          </select>
        )}

        {activeTab === "products" && (
          <select
            value={productStatus}
            onChange={(e) => {
              setProductStatus(e.target.value);
              setPage(0);
            }}
            className="border bg-input border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="LISTED">Listed</option>
            <option value="DRAFT">Draft</option>
            <option value="SOLD">Sold</option>
            <option value="PAID">Paid</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
          </select>
        )}

        {activeTab === "auctions" && (
          <select
            value={String(auctionIsClosed)}
            onChange={(e) => {
              setAuctionIsClosed(e.target.value === "true");
              setPage(0);
            }}
            className="border bg-input border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="false">Open / Active</option>
            <option value="true">Closed</option>
          </select>
        )}
      </div>
    );
  };

  const renderTable = () => {
    if (loading)
      return (
        <div className="p-10 text-center text-muted-foreground">
          Loading data...
        </div>
      );
    if (data.length === 0)
      return (
        <div className="p-10 text-center text-muted-foreground">
          No records found.
        </div>
      );

    return (
      <div className="overflow-x-auto bg-card rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {activeTab === "users" && (
                <>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Role
                  </th>
                </>
              )}
              {activeTab === "products" && (
                <>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Starting Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Seller ID
                  </th>
                </>
              )}
              {activeTab === "auctions" && (
                <>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Auction ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Last Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-border bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Ends At
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-muted/50">
                {/* USERS ROW */}
                {activeTab === "users" && (
                  <>
                    <td className="px-5 py-5 border-b border-border text-sm font-mono text-muted-foreground">
                      {item.id.substring(0, 8)}...
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm font-medium text-foreground">
                      {(item as User).name}
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm">
                      {(item as User).email}
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-700 dark:text-green-300 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-100 dark:bg-green-900 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">{(item as User).role}</span>
                      </span>
                    </td>
                  </>
                )}

                {activeTab === "products" && (
                  <>
                    <td className="px-5 py-5 border-b border-border text-sm font-medium text-foreground">
                      {(item as Product).title}
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm text-green-700 dark:text-green-500 font-semibold">
                      ${(item as Product).startingPrice}
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold
                        ${
                          (item as Product).status === "LISTED"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            : ""
                        }
                        ${
                          (item as Product).status === "SOLD"
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                            : ""
                        }
                        ${
                          (item as Product).status === "DELIVERED"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : ""
                        }
                        ${
                          (item as Product).status === "DRAFT"
                            ? "bg-muted text-muted-foreground"
                            : ""
                        }
                      `}
                      >
                        {(item as Product).status}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm font-mono text-muted-foreground">
                      {(item as Product).sellerId
                        ? (item as Product).sellerId.substring(0, 8) + "..."
                        : "N/A"}
                    </td>
                  </>
                )}

                {/* AUCTIONS ROW */}
                {activeTab === "auctions" && (
                  <>
                    <td className="px-5 py-5 border-b border-border text-sm font-mono text-muted-foreground">
                      {item.id.substring(0, 8)}...
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm text-muted-foreground font-mono">
                      {(item as Auction).productId
                        ? `${(item as Auction).productId.substring(0, 15)}...`
                        : "N/A"}
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm font-bold text-primary">
                      {(item as Auction).lastPrice !== null
                        ? `$${(item as Auction).lastPrice}`
                        : "No Bids"}
                    </td>
                    <td className="px-5 py-5 border-b border-border text-sm">
                      {(item as Auction).endTime
                        ? new Date(
                            (item as Auction).endTime
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg bg-secondary hover:bg-red-500 transition-colors duration-500 hover:scale-110"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-border">
          {["users", "products", "auctions"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-2 px-4 font-medium capitalize transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-4 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderFilters()}
        {renderTable()}

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-muted-foreground">
            Page <span className="font-semibold">{page + 1}</span> of{" "}
            <span className="font-semibold">{totalPages || 1}</span>
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-l hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-r hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
