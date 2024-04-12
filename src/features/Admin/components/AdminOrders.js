import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrderAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../Order/OrderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/Constants";
import Pagination from "../../CommonComponents/Pagination";
import { ThreeDots } from "react-loader-spinner";
import { OrderStatus } from "../../User/userSlice";
function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(OrderStatus);
  const totalOrders = useSelector(selectTotalOrders);
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrderAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handleShow = (order) => {};

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleOrderStatus = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return `bg-purple-200 text-purple-600`;
      case "dispatched":
        return `bg-yellow-200 text-yellow-600`;
      case "delivered":
        return `bg-green-200 text-green-600`;
      case "cancelled":
        return `bg-red-200 text-red-600`;
      default:
        return `bg-purple-200 text-purple-600`;
    }
  };
  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded my-6">
            {status === "loading" && (
              <div className="w-full h-full flex justify-center items-center ">
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{ "text-align": "center" }}
                  wrapperClass=""
                />
              </div>
            )}
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort?._order === "asc" && (
                      <ArrowUpIcon className="w-4 h-4 inline" />
                    )}
                    {sort?._order === "desc" && (
                      <ArrowDownIcon className="w-4 h-4 inline" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th
                    className="py-3 px-6 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort?._order === "asc" && (
                      <ArrowUpIcon className="w-4 h-4 inline" />
                    )}
                    {sort?._order === "desc" && (
                      <ArrowDownIcon className="w-4 h-4 inline" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-left">
                      {order.products.map((item) => (
                        <div className="flex items-center py-2">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span>
                            {item.product.title} - {item.quantity} (Rs.{" "}
                            {discountedPrice(item.product) * item.quantity})
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        Rs.{order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div>
                        <div>
                          <strong>{order.selectedAddress.name}</strong>
                        </div>
                        <div>{order.selectedAddress.street}</div>
                        <div>
                          {order.selectedAddress.city},{" "}
                          {order.selectedAddress.state}
                        </div>

                        <div>{order.selectedAddress.pinCode}</div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {editableOrderId === order.id ? (
                        <select
                          onChange={(e) => handleOrderStatus(e, order)}
                          defaultValue={order.status}
                          className=" text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110">
                          <EyeIcon onClick={() => handleShow(order)} />
                        </div>
                        <div className="w-6 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110">
                          <PencilIcon onClick={() => handleEdit(order)} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* pagination component */}
      <Pagination
        handlePage={handlePage}
        page={page}
        setPage={setPage}
        totalItems={totalOrders}
      />
    </div>
  );
}

export default AdminOrders;
