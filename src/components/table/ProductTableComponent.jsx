import { Avatar, Button, Checkbox, Chip, Table } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAllProductsQuery } from "../API/productApi";
import {Pagination} from "@heroui/react";



export default function ProductTableComponent() {
  const [page, setPage] = useState(1);
  console.log(page);
  const { data: products } = useGetAllProductsQuery({ page: page });
  console.log("Fetching products : ", products?.content);
  console.log(products?.content.length);
  const totalPages = Math.ceil((products?.content?.length) / 12);
  console.log(totalPages);
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-blue-900">Products</h1>
        <p className="text-base text-blue-500">Manage your product catalog</p>
      </div>
      <div className="w-full rounded-xl bg-white shadow-sm border border-blue-100">
        <Table className="w-full">
          <Table.ScrollContainer>
            <Table.Content aria-label="Team members" className="min-w-175">
            <Table.Header className="bg-sky-50">
              <Table.Column isRowHeader className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Product
              </Table.Column>
              <Table.Column className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Product UUID
              </Table.Column>
              <Table.Column className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Quantity
              </Table.Column>
              <Table.Column className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Price
              </Table.Column>
              <Table.Column className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Category
              </Table.Column>
              <Table.Column className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Actions
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {products?.content?.map((u) => (
                <Table.Row
                  key={u?.uuid}
                  className="hover:bg-sky-50/70 transition-colors"
                >
                  <Table.Cell className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={u?.thumbnail}
                        alt=""
                        className="w-11 h-11 rounded-lg object-cover border border-blue-100 shrink-0"
                      />
                      <span className="font-medium text-blue-900">{u?.name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="block max-w-27.5 truncate text-sm text-gray-400" title={u?.uuid}>
                      {u?.uuid}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="text-base font-medium text-gray-700 tabular-nums">
                    {u?.stockQuantity}
                  </Table.Cell>
                  <Table.Cell className="text-base font-bold text-blue-900 tabular-nums">
                    ${u?.priceOut}
                  </Table.Cell>
                  <Table.Cell>
                    <Chip size="sm" className="bg-cyan-50 text-cyan-700 border border-cyan-200">
                      {u?.category?.name}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="tertiary"
                        className="rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100"
                      >
                        <Icon className="size-4.5" icon="gravity-ui:eye" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="tertiary"
                        className="rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                      >
                        <Icon className="size-4.5" icon="gravity-ui:pencil" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="danger-soft"
                        className="rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Icon className="size-4.5" icon="gravity-ui:trash-bin" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        </Table>
        <div className="border-t border-blue-100 py-5">
          <Pagination className="justify-center">
            <Pagination.Content className="gap-2">
              <Pagination.Item>
                <Pagination.Previous
                  className="rounded-lg text-blue-600 hover:bg-sky-50 font-medium"
                  onClick={() => setPage((p) => p <= 0 ? 0 : p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                    className={
                      p === page
                        ? "rounded-lg bg-blue-900 text-white font-semibold tabular-nums shadow-sm"
                        : "rounded-lg text-blue-700 font-medium tabular-nums hover:bg-sky-50"
                    }
                  >
                    {page}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  className="rounded-lg text-blue-600 hover:bg-sky-50 font-medium"
                  onClick={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
