"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  MapPin,
  Phone,
  UserCircle,
  Store,
  Clock,
  Edit,
  BarChart3,
  Users,
  Package,
  DollarSign,
  CreditCard,
  Calendar,
} from "lucide-react"

interface StoreLocation {
  id: string
  name: string
  address: string
  city: string
  phone: string
  manager: string
  status: "active" | "inactive" | "maintenance"
  openingHours: string
  employeeCount: number
  dailyRevenue: number
  image: string
}

export default function BranchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddingStore, setIsAddingStore] = useState(false)
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null)

  // Danh sách chi nhánh mẫu
  const [stores, setStores] = useState<StoreLocation[]>([
    {
      id: "1",
      name: "Chi nhánh Quận 1",
      address: "123 Nguyễn Huệ, Quận 1",
      city: "TP.HCM",
      phone: "028 1234 5678",
      manager: "Nguyễn Văn An",
      status: "active",
      openingHours: "07:00 - 22:00",
      employeeCount: 12,
      dailyRevenue: 12500000,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "2",
      name: "Chi nhánh Quận 3",
      address: "45 Lê Văn Sỹ, Quận 3",
      city: "TP.HCM",
      phone: "028 2345 6789",
      manager: "Trần Thị Bình",
      status: "active",
      openingHours: "07:00 - 22:00",
      employeeCount: 10,
      dailyRevenue: 9800000,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "3",
      name: "Chi nhánh Quận 7",
      address: "123 Nguyễn Thị Thập, Quận 7",
      city: "TP.HCM",
      phone: "028 3456 7890",
      manager: "Lê Văn Cường",
      status: "active",
      openingHours: "07:00 - 22:30",
      employeeCount: 15,
      dailyRevenue: 15200000,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "4",
      name: "Chi nhánh Quận 9",
      address: "56 Lê Văn Việt, Quận 9",
      city: "TP.HCM",
      phone: "028 4567 8901",
      manager: "Phạm Thị Dung",
      status: "maintenance",
      openingHours: "07:00 - 22:00",
      employeeCount: 8,
      dailyRevenue: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "5",
      name: "Chi nhánh Tân Bình",
      address: "234 Cộng Hòa, Tân Bình",
      city: "TP.HCM",
      phone: "028 5678 9012",
      manager: "Hoàng Văn Em",
      status: "active",
      openingHours: "07:00 - 22:00",
      employeeCount: 9,
      dailyRevenue: 8500000,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "6",
      name: "Chi nhánh Bình Thạnh",
      address: "56 Điện Biên Phủ, Bình Thạnh",
      city: "TP.HCM",
      phone: "028 6789 0123",
      manager: "Ngô Thị Phương",
      status: "active",
      openingHours: "07:00 - 22:00",
      employeeCount: 11,
      dailyRevenue: 11300000,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "7",
      name: "Chi nhánh Quận 2",
      address: "78 Trần Não, Quận 2",
      city: "TP.HCM",
      phone: "028 7890 1234",
      manager: "Đỗ Văn Giang",
      status: "inactive",
      openingHours: "07:00 - 22:00",
      employeeCount: 0,
      dailyRevenue: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "8",
      name: "Chi nhánh Hà Nội",
      address: "45 Lý Thường Kiệt, Ba Đình",
      city: "Hà Nội",
      phone: "024 8901 2345",
      manager: "Lý Thị Hoa",
      status: "active",
      openingHours: "07:00 - 22:00",
      employeeCount: 14,
      dailyRevenue: 13200000,
      image: "/placeholder.svg?height=100&width=200",
    },
  ])

  // Lọc chi nhánh
  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab = activeTab === "all" || store.status === activeTab

    return matchesSearch && matchesTab
  })

  // Format tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Đếm số lượng chi nhánh theo trạng thái
  const activeStores = stores.filter((store) => store.status === "active").length
  const inactiveStores = stores.filter((store) => store.status === "inactive").length
  const maintenanceStores = stores.filter((store) => store.status === "maintenance").length

  // Tổng doanh thu hằng ngày
  const totalDailyRevenue = stores.reduce((sum, store) => sum + store.dailyRevenue, 0)

  // Tổng số nhân viên
  const totalEmployees = stores.reduce((sum, store) => sum + store.employeeCount, 0)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Quản lý chi nhánh</h1>
          <p className="text-muted-foreground">Quản lý thông tin và hiệu suất các chi nhánh bán hàng</p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={isAddingStore} onOpenChange={setIsAddingStore}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm chi nhánh
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Thêm chi nhánh mới</DialogTitle>
                <DialogDescription>Nhập thông tin chi tiết về chi nhánh mới.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên chi nhánh</Label>
                  <Input id="name" placeholder="Nhập tên chi nhánh" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" placeholder="Nhập địa chỉ chi nhánh" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input id="city" placeholder="Nhập thành phố" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" placeholder="Nhập số điện thoại" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Quản lý</Label>
                  <Input id="manager" placeholder="Nhập tên quản lý" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Giờ mở cửa</Label>
                  <Input id="hours" placeholder="Ví dụ: 07:00 - 22:00" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingStore(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsAddingStore(false)}>Thêm chi nhánh</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng chi nhánh</CardTitle>
              <Store className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stores.length}</div>
              <p className="text-xs text-muted-foreground">Tổng số chi nhánh trong hệ thống</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng doanh thu hằng ngày</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalDailyRevenue)}</div>
              <p className="text-xs text-muted-foreground">Doanh thu trung bình mỗi ngày</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng nhân viên</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Nhân viên tại tất cả chi nhánh</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chi nhánh đang hoạt động</CardTitle>
              <Store className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{activeStores}</div>
              <p className="text-xs text-muted-foreground">
                {inactiveStores} ngừng hoạt động, {maintenanceStores} bảo trì
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm chi nhánh theo tên, địa chỉ, thành phố..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all" className="px-4">
                Tất cả
              </TabsTrigger>
              <TabsTrigger value="active" className="px-4">
                Hoạt động
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="px-4">
                Bảo trì
              </TabsTrigger>
              <TabsTrigger value="inactive" className="px-4">
                Đã đóng cửa
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStores.length === 0 ? (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              <Store className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p>Không tìm thấy chi nhánh nào</p>
            </div>
          ) : (
            filteredStores.map((store) => (
              <Card key={store.id} className="overflow-hidden">
                <img
                  src={store.image || "/placeholder.svg"}
                  alt={store.name}
                  className="h-36 w-full object-cover border-b"
                />
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    {store.status === "active" ? (
                      <Badge className="bg-green-500">Hoạt động</Badge>
                    ) : store.status === "maintenance" ? (
                      <Badge variant="outline" className="text-amber-500 border-amber-500">
                        Bảo trì
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Đã đóng cửa</Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                    {store.address}, {store.city}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                    {store.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <UserCircle className="h-3 w-3 mr-2 text-muted-foreground" />
                    {store.manager}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                    {store.openingHours}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Nhân viên</p>
                      <p className="font-bold">{store.employeeCount}</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Doanh thu/ngày</p>
                      <p className="font-bold text-sm">
                        {store.dailyRevenue > 0 ? formatCurrency(store.dailyRevenue) : "-"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-[48%]" onClick={() => setSelectedStore(store)}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Chi tiết chi nhánh</DialogTitle>
                      </DialogHeader>
                      {selectedStore && (
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">{selectedStore.name}</h3>
                            {selectedStore.status === "active" ? (
                              <Badge className="bg-green-500">Hoạt động</Badge>
                            ) : selectedStore.status === "maintenance" ? (
                              <Badge variant="outline" className="text-amber-500 border-amber-500">
                                Bảo trì
                              </Badge>
                            ) : (
                              <Badge variant="destructive">Đã đóng cửa</Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Địa chỉ:</p>
                              <p>
                                {selectedStore.address}, {selectedStore.city}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Số điện thoại:</p>
                              <p>{selectedStore.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Quản lý:</p>
                              <p>{selectedStore.manager}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Giờ mở cửa:</p>
                              <p>{selectedStore.openingHours}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 mt-2">
                            <Card>
                              <CardContent className="p-4 text-center">
                                <Users className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                                <p className="text-xs text-muted-foreground">Nhân viên</p>
                                <p className="font-bold">{selectedStore.employeeCount}</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <Package className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                                <p className="text-xs text-muted-foreground">Sản phẩm</p>
                                <p className="font-bold">250</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <CreditCard className="h-5 w-5 mx-auto mb-2 text-green-500" />
                                <p className="text-xs text-muted-foreground">Đơn hàng/ngày</p>
                                <p className="font-bold">42</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <Calendar className="h-5 w-5 mx-auto mb-2 text-purple-500" />
                                <p className="text-xs text-muted-foreground">Ngày mở</p>
                                <p className="font-bold">15/06/2022</p>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Biểu đồ doanh thu</h4>
                            <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                              <p className="text-muted-foreground">Biểu đồ doanh thu thời gian</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-[48%]">
                    <Edit className="h-4 w-4 mr-2" />
                    Sửa
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
