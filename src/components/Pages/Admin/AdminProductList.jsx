import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, searchProducts } from "../../../store/actions";
import { useSearchParams } from "react-router-dom";

import PaginationRounded from "../../PaginationRounded";
import AdminSidebar from "./AdminSidebar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";

const AdminProductList = () => {
    const { products, pagination } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const searchKey = searchParams.get("key") || "";
    const [searchTerm, setSearchTerm] = useState(searchKey);

    useEffect(() => {
        setSearchTerm(searchKey);
    }, [searchKey]);

    useEffect(() => {
        const pageIndex = page - 1;
        const baseQuery = `pageNumber=${pageIndex}&pageSize=5&sortBy=productId&sortOrder=asc`;

        if (searchKey.trim()) {
            dispatch(searchProducts(`key=${encodeURIComponent(searchKey.trim())}&${baseQuery}`));
            return;
        }

        dispatch(fetchProduct(baseQuery));
    }, [dispatch, page, searchKey]);

    const handleSearch = () => {
        const nextParams = new URLSearchParams(searchParams);

        if (searchTerm.trim()) {
            nextParams.set("key", searchTerm.trim());
        } else {
            nextParams.delete("key");
        }

        nextParams.set("page", "1");
        setSearchParams(nextParams);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete("key");
        nextParams.set("page", "1");
        setSearchParams(nextParams);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="mt-[50px] flex-1 p-6">
                <div className="mb-4 mt-2 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">Danh sách sản phẩm</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Tìm kiếm toàn bộ sản phẩm theo mã sản phẩm hoặc tên sản phẩm.
                        </p>
                    </div>

                    <a
                        href="/admin/product/addproduct"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-green-600 px-4 py-3 text-center text-white hover:bg-green-700"
                    >
                        Thêm sản phẩm
                    </a>
                </div>

                <div className="mb-5 max-w-2xl">
                    <label className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-500">
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="shrink-0 text-lg text-slate-500 transition hover:text-emerald-600"
                            aria-label="Tìm kiếm sản phẩm"
                        >
                            <FiSearch />
                        </button>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            placeholder="Tìm mã sản phẩm hoặc tên sản phẩm"
                            className="w-full bg-transparent text-sm text-slate-800 outline-none"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="text-slate-400 transition hover:text-slate-700"
                                aria-label="Xóa tìm kiếm"
                            >
                                <FiX />
                            </button>
                        )}
                    </label>
                </div>

                <div className="rounded bg-white shadow">
                    <table className="min-w-full table-auto border-collapse border border-slate-300">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="border px-2 py-2">STT</th>
                                <th className="border px-4 py-2">Mã sản phẩm</th>
                                <th className="border px-4 py-2">Ảnh</th>
                                <th className="border px-4 py-2">Tên</th>
                                <th className="border px-4 py-2">Mô tả</th>
                                <th className="border px-4 py-2">Giá</th>
                                <th className="border px-4 py-2">Giảm (%)</th>
                                <th className="border px-4 py-2">Tồn kho</th>
                                <th className="border px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={product.productId ?? index} className="hover:bg-slate-50">
                                        <td className="border px-2 py-2 text-center">
                                            {pagination?.pageNumber
                                                ? pagination.pageNumber * (pagination.pageSize || 5) + index + 1
                                                : index + 1}
                                        </td>
                                        <td className="border px-4 py-2 text-center">{product.productCode}</td>
                                        <td className="border px-4 py-2 text-center">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.productName}
                                                    className="mx-auto mt-1 h-14 w-14 rounded-md object-cover"
                                                />
                                            ) : (
                                                <span className="italic text-gray-400">Không có ảnh</span>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">{product.productName}</td>
                                        <td className="border px-4 py-2">{product.description}</td>
                                        <td className="border px-4 py-2 text-right">
                                            {product.price?.toLocaleString()} ₫
                                        </td>
                                        <td className="border px-4 py-2 text-center">{product.discount}%</td>
                                        <td className="border px-4 py-2 text-center">{product.quantity}</td>
                                        <td className="border px-4 py-2 text-center align-middle">
                                            <div className="flex items-center justify-center gap-2">
                                                <a
                                                    href={`/admin/product/update/${product.productId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-500 hover:text-gray-800"
                                                >
                                                    <FaEdit size={25} />
                                                </a>
                                                <a
                                                    href="#"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <MdDelete size={25} />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="py-4 text-center text-slate-500">
                                        {searchKey.trim()
                                            ? "Không tìm thấy sản phẩm phù hợp."
                                            : "Không có sản phẩm nào."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {pagination && (
                    <div className="mt-4 text-center text-sm text-slate-600">
                        Trang {pagination.pageNumber + 1} / {pagination.totalPages} — Tổng cộng:{" "}
                        {pagination.totalElements} sản phẩm
                    </div>
                )}

                <PaginationRounded
                    numberofPage={pagination?.totalPages}
                    totalProducts={pagination?.totalElements}
                />
            </div>
        </div>
    );
};

export default AdminProductList;
