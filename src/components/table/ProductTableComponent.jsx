import { Avatar, Button, Checkbox, Chip, Table } from "@heroui/react";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAllProductsQuery } from "../API/productApi";


export default function ProductTableComponent() {
  const { data: products } = useGetAllProductsQuery([]);
  console.log(`===> fetch product`, products?.content);
  return (
    <div className="w-full col-span-2">
      <Table className="w-full p-8">
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-[600px]">
            <Table.Header>
              <Table.Column isRowHeader>Product UUID</Table.Column>
              <Table.Column>Image</Table.Column>
              <Table.Column>Product Name</Table.Column>
              <Table.Column>Quantity</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {products?.content?.map((u) => (
                <Table.Row key={u?.uuid}>
                  <Table.Cell>{u?.uuid}</Table.Cell>
                  <Table.Cell>
                    <img src={u?.thumbnail} alt="" className="w-12 h-12" />
                  </Table.Cell>
                  <Table.Cell>{u?.name}</Table.Cell>
                  <Table.Cell>{u?.stockQuantity}</Table.Cell>
                  <Table.Cell>{u?.priceOut}</Table.Cell>
                  <Table.Cell>{u?.category?.name}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      <Button isIconOnly size="sm" variant="tertiary">
                        <Icon className="size-4" icon="gravity-ui:eye" />
                      </Button>
                      <Button isIconOnly size="sm" variant="tertiary">
                        <Icon className="size-4" icon="gravity-ui:pencil" />
                      </Button>
                      <Button isIconOnly size="sm" variant="danger-soft">
                        <Icon className="size-4" icon="gravity-ui:trash-bin" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
