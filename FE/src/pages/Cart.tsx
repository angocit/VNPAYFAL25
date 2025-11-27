import { useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import type { IData } from "../types/product";
import { Button, Checkbox, Table } from "antd";

const Cart = () => {
  const queryclient = useQueryClient();
  const [selectProduct, setSelectProduct] = useState<any>([]);
  const { data, isLoading, isError } = useQuery<IData>({
    queryKey: ["GetCart"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/products/getcart"
      );
      return data;
    },
    // enabled: !queryclient.getQueryData(["AllProduct"])
    staleTime: Infinity,
  });
  const handleselectProduct = (data: any, e: any) => {
    if (e) {
      setSelectProduct([...selectProduct, data]);
    } else {
      setSelectProduct(
        selectProduct.filter(
          (item: any) => item.productId._id != data.productId._id
        )
      );
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      render: (_: any, data: any, index: number) => (
        <>
          <Checkbox
            onChange={(e: any) => handleselectProduct(data, e.target.checked)}
          />
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "productId",
      key: "name",
      render: (value: any) => value.name,
    },
    {
      title: "Image",
      dataIndex: "productId",
      key: "image",
      render: (value: any) => <img width={90} src={value.image} />,
    },
    {
      title: "Price",
      dataIndex: "productId",
      key: "price",
      render: (value: any) => value.price,
    },
    {
      title: "SLg",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
  const handleMakePayment = async () => {
    // console.log(selectProduct);
    const { data } = await axios.post(
      "http://localhost:3000/api/payment/make-payment",
      { data: selectProduct, amount: Amount(selectProduct) }
    );
    window.location.href = data;
  };
  const Amount = (arrProduct: any) => {
    return arrProduct.reduce(
      (total: number, item: any) =>
        total + Number(item.productId.price) * Number(item.quantity),
      0
    );
  };
  if (isLoading) return <>Loading</>;
  return (
    <>
      {data && data?.data.length && (
        <Table
          rowKey="productId._id"
          dataSource={data.data ?? []}
          columns={columns}
        />
      )}
      <p>Tổng tiền: {Amount(selectProduct)}</p>
      <Button type="primary" onClick={() => handleMakePayment()}>
        Thanh toán VNPAY
      </Button>
    </>
  );
};

export default Cart;
