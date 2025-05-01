import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import SearchBar from "./../../layouts/private/SearchBar";
import TableHeader from "./components/TableHeader";
import VoucherRow from "./components/VoucherRow";
import { vouchersController } from "../../controllers/voucher.controller.js";
import Loading from "../../components/Loading";

function VoucherList() {
    const [allVouchers, setAllVouchers] = useState([]);
    const [filteredVouchers, setFilteredVouchers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const newVoucher = location.state?.newVoucher;
    const deletedVoucherCode = location.state?.deletedVoucherCode;

    // Lấy danh sách voucher khi load trang
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let result = await vouchersController(setLoading);
                if (result) {
                    // Nếu có deletedVoucherCode thì lọc
                    if (deletedVoucherCode) {
                        console.log("Voucher cần xóa:", deletedVoucherCode);
                        result = result.filter(v => 
                            v.voucherCode.trim().toLowerCase() !== deletedVoucherCode.trim().toLowerCase()
                        );
                    }
                    setAllVouchers(result);
                    setFilteredVouchers(result);
                }
            } catch (err) {
                setError("Không thể tải dữ liệu voucher. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [deletedVoucherCode]);

    // Xử lý tìm kiếm
    const handleSearch = (value) => {
        const keyword = value.toLowerCase();
        const filtered = allVouchers.filter(voucher => {
            const code = voucher.voucherCode?.toLowerCase() || "";
            const minAmount = voucher.minAmount?.toString() || "";
            const discountPercent = voucher.discountPercentage?.toString() || "";
            const discountAmount = voucher.discountAmount?.toString() || "";
            const validity = voucher.validityPeriod?.toString() || "";
            const statusText = voucher.status === 1 ? "hoạt động" : (voucher.status === 0 ? "tạm dừng" : "không xác định");

            return (
                code.includes(keyword) ||
                minAmount.includes(keyword) ||
                discountPercent.includes(keyword) ||
                discountAmount.includes(keyword) ||
                validity.includes(keyword) ||
                statusText.includes(keyword)
            );
        });
        setFilteredVouchers(filtered);
    };

    // Thêm voucher mới nếu có
    useEffect(() => {
        if (newVoucher) {
            setAllVouchers(prev => [...prev, newVoucher]);
            setFilteredVouchers(prev => [...prev, newVoucher]);
        }
    }, [newVoucher]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Helmet>
                <title>Quản lý voucher</title>
            </Helmet>
            <div className="flex flex-col flex-1 justify-center items-center shrink p-[4rem] text-xl font-medium bg-white basis-0 min-w-[15rem] max-md:px-[1.25rem] max-md:max-w-full">
                <SearchBar onSearch={handleSearch} />
                <div className="flex flex-col mt-6 w-full text-[#171717] max-md:max-w-full">
                    <div className="text-right mb-3 max-md:max-w-full">
                        Tổng số voucher: {filteredVouchers.length}
                    </div>
                    <TableHeader />
                    {error ? (
                        <div className="text-[#dc2626]">{error}</div>
                    ) : (
                        filteredVouchers.length > 0 ? (
                            filteredVouchers.map((voucher, index) => (
                                <VoucherRow
                                    key={voucher._id}
                                    id={voucher._id}
                                    index={index}
                                    voucher={voucher}
                                    isDeleted={voucher.voucherCode === deletedVoucherCode}
                                />
                            ))
                        ) : (
                            <p className="mt-[1rem] text-center">Không tìm thấy voucher nào.</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default VoucherList;
