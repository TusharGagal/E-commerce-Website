import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrderAsync } from "./OrderSlice";
import { selectOrder } from "./OrderSlice";

export default function Counter() {
  const count = useSelector(selectOrder);
  const dispatch = useDispatch();
  return (
    <div>
      <div></div>
    </div>
  );
}
