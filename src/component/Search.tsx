import { useState } from "react";
import { Input, List, Avatar, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Text from "antd/es/typography/Text";
import { useSearchProductsQuery } from "../redux/features/products/products.api";
import { TProduct } from "./ProductCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchProductsQuery(
    { name: searchQuery },
    {
      skip: searchQuery.length < 3,
    }
  );

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);

    if (query.length >= 3) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  };

  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    navigate(`/products/${itemId}`);
    setIsDropdownVisible(false);
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", position: "relative" }}>
      <Input
        value={searchQuery}
        onChange={(e) => handleSearchQuery(e.target.value)}
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{ width: 200 }}
        onFocus={() => searchQuery.length >= 3 && setIsDropdownVisible(true)}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
      />

      {/* Dropdown for search results */}
      {isDropdownVisible && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            maxHeight: "300px",
            overflowY: "auto",
            padding: "8px 0",
            marginTop: "8px",
          }}
          onMouseDown={(e) => e.preventDefault()} // Prevents onBlur from being triggered when clicking inside the dropdown
        >
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "16px" }}>
              <Spin size="small" />
            </div>
          ) : isError ? (
            <Text
              type="danger"
              style={{ padding: "8px 16px", display: "block" }}
            >
              Error fetching results.
            </Text>
          ) : searchResults?.data?.result?.length > 0 ? (
            <List
              dataSource={searchResults.data.result}
              renderItem={(item: TProduct) => (
                <List.Item
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                  onClick={() => handleItemClick(item._id)}
                >
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    shape="square"
                    size={40}
                    style={{ borderRadius: "6px" }}
                  />
                  <div
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      flex: 1,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <Text
              style={{ padding: "8px 16px", display: "block", color: "#888" }}
            >
              No results found.
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
