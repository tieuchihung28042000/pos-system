"use client"

import { useState } from "react"
import { Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dữ liệu mẫu cho mã giảm giá
const couponData = [
  {
    id: "SUMMER2024",
    name: "Khuyến mãi hè 2024",
    type: "Giảm giá phần trăm",
    value: 15,
    minOrder: 500000,
    maxDiscount: 200000,
    startDate: "01/05/2024",
    endDate: "31/07/2024",
    usageLimit: 100,
    usageCount: 42,
    status: "Đang hoạt động",
  },
  {
    id: "WELCOME50K",
    name: "Chào mừng khách hàng mới",
    type: "Giảm giá cố định",
    value: 50000,
    minOrder: 300000,
    maxDiscount: 50000,
    startDate: "01/01/2024",
    endDate: "31/12/2024",
    usageLimit: 500,
    usageCount: 215,
    status: "Đang hoạt động",
  },
  {
    id: "FREESHIP",
    name: "Miễn phí vận chuyển",
    type: "Miễn phí vận chuyển",
    value: 30000,
    minOrder: 200000,
    maxDiscount: 30000,
    startDate: "01/04/2024",
    endDate: "30/06/2024",
    usageLimit: 200,
    usageCount: 98,
    status: "Đang hoạt động",
  },
  {
    id: "BIRTHDAY24",
    name: "Sinh nhật khách hàng",
    type: "Giảm giá phần trăm",
    value: 20,
    minOrder: 0,
    maxDiscount: 100000,
    startDate: "01/01/2024",
    endDate: "31/12/2024",
    usageLimit: 1000,
    usageCount: 320,
    status: "Đang hoạt động",
  },
  {
    id: "FLASH100K",
    name: "Flash sale cuối tuần",
    type: "Giảm giá cố định",
    value: 100000,
    minOrder: 500000,
    maxDiscount: 100000,
    startDate: "01/05/2024",
    endDate: "02/05/2024",
    usageLimit: 50,
    usageCount: 50,
    status: "Hết lượt",
  },
  {
    id: "SPRING2024",
    name: "Khuyến mãi xuân 2024",
    type: "Giảm giá phần trăm",
    value: 10,
    minOrder: 300000,
    maxDiscount: 150000,
    startDate: "01/02/2024",
    endDate: "30/04/2024",
    usageLimit: 200,
    usageCount: 185,
    status: "Hết hạn",
  },
  {
    id: "MEMBER10",
    name: "Ưu đãi thành viên",
    type: "Giảm giá phần trăm",
    value: 10,
    minOrder: 0,
    maxDiscount: 50000,
    startDate: "01/01/2024",
    endDate: "31/12/2024",
    usageLimit: 0,
    usageCount: 425,
    status: "Đang hoạt động",
  },
]

export default function PromotionCouponsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mã giảm giá</h1>
          <p className="text-muted-foreground">Quản lý các mã giảm giá và theo dõi hiệu quả sử dụng</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Thêm mã giảm giá
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng mã giảm giá</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-blue-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{couponData.length}</div>
          </CardContent>
        </Card>
        {/* Additional cards can be added here */}
      </div>

      {/* Table component can be added here */}
    </div>
  )
}
