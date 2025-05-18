import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Calendar, Gift, Package, Percent, Search, Tag, Ticket, Trash2, Users } from "lucide-react"
import Link from "next/link"

export default function PromotionsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý khuyến mãi</h1>
        <p className="text-muted-foreground">
          Tạo và quản lý các chương trình khuyến mãi và mã giảm giá cho cửa hàng của bạn
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm khuyến mãi..." className="w-full rounded-lg pl-8 md:w-[300px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="scheduled">Sắp diễn ra</SelectItem>
              <SelectItem value="expired">Đã kết thúc</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/promotion/add">
            <Plus className="mr-2 h-4 w-4" />
            Tạo khuyến mãi mới
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="discounts">Giảm giá</TabsTrigger>
          <TabsTrigger value="coupons">Mã giảm giá</TabsTrigger>
          <TabsTrigger value="bundles">Combo</TabsTrigger>
          <TabsTrigger value="gifts">Quà tặng</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="discounts" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotions
              .filter((promotion) => promotion.type === "discount")
              .map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="coupons" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotions
              .filter((promotion) => promotion.type === "coupon")
              .map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="bundles" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotions
              .filter((promotion) => promotion.type === "bundle")
              .map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="gifts" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotions
              .filter((promotion) => promotion.type === "gift")
              .map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Phân tích hiệu quả khuyến mãi</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Tổng doanh thu từ khuyến mãi"
            value="24.560.000₫"
            description="Tăng 12% so với tháng trước"
            trend="up"
          />
          <MetricCard
            title="Số lượng mã giảm giá đã sử dụng"
            value="342"
            description="Tăng 8% so với tháng trước"
            trend="up"
          />
          <MetricCard
            title="Giá trị giảm giá trung bình"
            value="72.000₫"
            description="Giảm 3% so với tháng trước"
            trend="down"
          />
        </div>
      </div>
    </div>
  )
}

function PromotionCard({ promotion }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 whitespace-nowrap">Đang hoạt động</Badge>
      case "scheduled":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500 whitespace-nowrap">
            Sắp diễn ra
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500 whitespace-nowrap">
            Đã kết thúc
          </Badge>
        )
      default:
        return null
    }
  }

  const getPromotionIcon = (type) => {
    switch (type) {
      case "discount":
        return <Percent className="h-5 w-5 text-purple-500" />
      case "coupon":
        return <Ticket className="h-5 w-5 text-blue-500" />
      case "bundle":
        return <Package className="h-5 w-5 text-orange-500" />
      case "gift":
        return <Gift className="h-5 w-5 text-red-500" />
      default:
        return <Tag className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getPromotionIcon(promotion.type)}
            <div>
              <CardTitle className="text-lg">{promotion.name}</CardTitle>
              <CardDescription>{promotion.description}</CardDescription>
            </div>
          </div>
          {getStatusBadge(promotion.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {promotion.startDate} - {promotion.endDate}
              </span>
            </div>
            {promotion.usageLimit && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {promotion.usageCount}/{promotion.usageLimit}
                </span>
              </div>
            )}
          </div>
          {promotion.usageLimit && (
            <div className="mt-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Đã sử dụng</span>
                <span>{Math.round((promotion.usageCount / promotion.usageLimit) * 100)}%</span>
              </div>
              <Progress value={(promotion.usageCount / promotion.usageLimit) * 100} className="h-1.5" />
            </div>
          )}
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {promotion.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/promotion/${promotion.id}`}>Chi tiết</Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Chỉnh sửa</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Xóa</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function MetricCard({ title, value, description, trend }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs mt-1 flex items-center ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

// Mock data
const promotions = [
  {
    id: "1",
    name: "Giảm giá mùa hè",
    description: "Giảm 20% cho tất cả sản phẩm mùa hè",
    type: "discount",
    status: "active",
    startDate: "01/06/2023",
    endDate: "31/08/2023",
    usageCount: 156,
    usageLimit: 500,
    tags: ["Mùa hè", "Quần áo"],
  },
  {
    id: "2",
    name: "Mã WELCOME10",
    description: "Giảm 10% cho khách hàng mới",
    type: "coupon",
    status: "active",
    startDate: "01/01/2023",
    endDate: "31/12/2023",
    usageCount: 342,
    usageLimit: 1000,
    tags: ["Khách hàng mới", "Toàn bộ sản phẩm"],
  },
  {
    id: "3",
    name: "Combo tiết kiệm",
    description: "Mua 2 sản phẩm giảm thêm 15%",
    type: "bundle",
    status: "active",
    startDate: "15/05/2023",
    endDate: "15/07/2023",
    usageCount: 89,
    usageLimit: 200,
    tags: ["Combo", "Tiết kiệm"],
  },
  {
    id: "4",
    name: "Quà tặng sinh nhật",
    description: "Tặng sản phẩm cho khách hàng sinh nhật",
    type: "gift",
    status: "active",
    startDate: "01/01/2023",
    endDate: "31/12/2023",
    usageCount: 45,
    usageLimit: null,
    tags: ["Sinh nhật", "Quà tặng"],
  },
  {
    id: "5",
    name: "Black Friday",
    description: "Giảm đến 50% cho ngày Black Friday",
    type: "discount",
    status: "scheduled",
    startDate: "24/11/2023",
    endDate: "26/11/2023",
    usageCount: 0,
    usageLimit: 1000,
    tags: ["Black Friday", "Giảm sốc"],
  },
  {
    id: "6",
    name: "Mã SUMMER2023",
    description: "Giảm 100.000đ cho đơn hàng từ 500.000đ",
    type: "coupon",
    status: "expired",
    startDate: "01/06/2022",
    endDate: "31/08/2022",
    usageCount: 423,
    usageLimit: 500,
    tags: ["Mùa hè", "Đơn hàng lớn"],
  },
]

import { ArrowDownRight, ArrowUpRight, Pencil, Plus } from "lucide-react"
