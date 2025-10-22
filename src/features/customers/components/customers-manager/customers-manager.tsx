"use client";

import { useState, useEffect } from "react";
import styles from "./customers-manager.module.css";
import DataManager from "@/shared/components/data-manager/data-manager";
import { Appointments } from "@/types";
import { formatDate } from "@/shared/utils/helpers/formatDate";
import SortIcon from "@/shared/components/sort-icon/sort-icon";
import useDebounce from "@/shared/hooks/useDebounce";
import { useAppointments } from "@/features/appointments/hooks/useAppointments";

export default function CustomersManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Appointments>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isMobile, setIsMobile] = useState(false);

  const debounceValue = useDebounce(searchTerm, 1500);

  const {
    data: users,
    counts,
    remove,
    isRemovePending,
    ...state
  } = useAppointments(statusFilter, debounceValue);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm) ||
        user.service_type?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleSort = (field: keyof Appointments) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (status: Appointments["status"]) => {
    switch (status) {
      case "confirmed":
        return <span className={`${styles.statusBadge} ${styles.statusConfirmed}`}>Confirmed</span>;
      case "completed":
        return <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>Completed</span>;
      case "pending":
        return <span className={`${styles.statusBadge} ${styles.statusPending}`}>Pending</span>;
      case "cancelled":
        return <span className={`${styles.statusBadge} ${styles.statusCancelled}`}>Cancelled</span>;
      default:
        return <span className={`${styles.statusBadge} ${styles.statusPending}`}>Unknown</span>;
    }
  };

  const handleRemove = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      remove(id);
    }
  };

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
  };

  const isValidCountKey = (key: string): key is keyof typeof counts => {
    return key in counts;
  };

  return (
    <div className={styles.container}>
      <DataManager state={state}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Customers</h2>
            <span className={styles.subtitle}>
              {filteredUsers.length} {filteredUsers.length === 1 ? "customer" : "customers"}
              {statusFilter !== "all" &&
                isValidCountKey(statusFilter) &&
                ` • ${counts[statusFilter]} total`}
            </span>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.searchBox}>
              <svg
                className={styles.searchIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {!isMobile && (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell} onClick={() => handleSort("first_name")}>
                    <div className={styles.headerCellContent}>
                      Name
                      <SortIcon
                        field="first_name"
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th className={styles.tableHeaderCell} onClick={() => handleSort("phone")}>
                    <div className={styles.headerCellContent}>
                      Phone
                      <SortIcon field="phone" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th className={styles.tableHeaderCell} onClick={() => handleSort("service_type")}>
                    <div className={styles.headerCellContent}>
                      Service
                      <SortIcon
                        field="service_type"
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th className={styles.tableHeaderCell} onClick={() => handleSort("created_at")}>
                    <div className={styles.headerCellContent}>
                      Date
                      <SortIcon
                        field="created_at"
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th className={styles.tableHeaderCell} onClick={() => handleSort("status")}>
                    <div className={styles.headerCellContent}>
                      Status
                      <SortIcon
                        field="status"
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                          {user.first_name
                            ?.split(" ")
                            .map((n) => n[0]?.toUpperCase())
                            .join("") || "U"}
                        </div>
                        <div className={styles.userDetails}>
                          <span className={styles.userName}>{user.first_name || "Unknown"}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.phone}>{user.phone || "No phone"}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.service}>{user.service_type || "No service"}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.date}>{formatDate(user.created_at)}</span>
                    </td>
                    <td className={styles.tableCell}>{getStatusBadge(user.status)}</td>
                    <td className={styles.tableCell}>
                      <div className={styles.actions}>
                        <button
                          onClick={() => handleRemove(user.id)}
                          disabled={isRemovePending}
                          className={`${styles.actionButton} ${styles.actionButtonDanger}`}
                          title="Delete"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          {isRemovePending ? "Deleting..." : ""}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isMobile && (
          <div className={styles.mobileCardsContainer}>
            {filteredUsers.map((user) => (
              <div key={user.id} className={styles.mobileCard}>
                <div className={styles.mobileCardHeader}>
                  <div className={styles.mobileUserInfo}>
                    <div className={styles.mobileAvatar}>
                      {user.first_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </div>
                    <div className={styles.mobileUserDetails}>
                      <h3 className={styles.mobileUserName}>{user.first_name || "Unknown"}</h3>
                    </div>
                  </div>
                  <div className={styles.mobileStatus}>{getStatusBadge(user.status)}</div>
                </div>

                <div className={styles.mobileCardContent}>
                  <div className={styles.mobileDetailRow}>
                    <span className={styles.mobileDetailLabel}>Phone</span>
                    <span className={styles.mobileDetailValue}>{user.phone || "No phone"}</span>
                  </div>
                  <div className={styles.mobileDetailRow}>
                    <span className={styles.mobileDetailLabel}>Service</span>
                    <span className={styles.mobileDetailValue}>
                      {user.service_type || "No service"}
                    </span>
                  </div>
                  <div className={styles.mobileDetailRow}>
                    <span className={styles.mobileDetailLabel}>Date</span>
                    <span className={styles.mobileDetailValue}>{formatDate(user.created_at)}</span>
                  </div>
                </div>

                <div className={styles.mobileActions}>
                  <button
                    onClick={() => handleRemove(user.id)}
                    disabled={isRemovePending}
                    className={`${styles.mobileActionButton} ${styles.mobileActionButtonDanger}`}
                    title="Delete"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    {isRemovePending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && !state.isLoading && (
          <div className={styles.emptyState}>
            <svg
              className={styles.emptyIcon}
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3 className={styles.emptyTitle}>
              {searchTerm ? "No customers found" : "No appointments yet"}
            </h3>
            <p className={styles.emptyDescription}>
              {searchTerm
                ? "Try adjusting your search to find what you're looking for."
                : "When customers book appointments, they will appear here."}
            </p>
          </div>
        )}
      </DataManager>
    </div>
  );
}
