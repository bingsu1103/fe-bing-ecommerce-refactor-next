"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserTable from "@/components/admin/table/UserTable";
import ProductTable from "@/components/admin/table/ProductTable";
import CategoryTable from "@/components/admin/table/CategoryTable";
import OrderTable from "@/components/admin/table/OrderTable";
import PaymentTable from "@/components/admin/table/PaymentTable";

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <main className="flex-1 p-6">
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="flex flex-wrap gap-2 mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* USERS */}
          <TabsContent value="users" id="users">
            <UserTable />
          </TabsContent>

          {/* PRODUCTS */}
          <TabsContent value="products" id="products">
            <ProductTable />
          </TabsContent>

          {/* CATEGORIES */}
          <TabsContent value="categories" id="categories">
            <CategoryTable />
          </TabsContent>

          {/* ORDERS */}
          <TabsContent value="orders" id="orders">
            <OrderTable />
          </TabsContent>

          {/* PAYMENTS */}
          <TabsContent value="payments" id="payments">
            <PaymentTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;
