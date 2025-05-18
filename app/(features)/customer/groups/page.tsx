"use client"

import { useState } from "react"
import { PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Dữ liệu mẫu cho nhóm khách hàng
const customerGroupData = [
  {
    id: "CG001",
    name: "Khách hàng VIP",
    description: "Khách hàng có tổng chi tiêu trên 10 triệu đồng",
    memberCount: 28,
    discountRate: 10,
    pointRate: 2,
    isActive: true,
    createdAt: "2023-01-15",
  },
  {
    id: "CG002",
    name: "Khách hàng thân thiết",
    description: "Khách hàng có tổng chi tiêu từ 5-10 triệu đồng",
    memberCount: 45,
    discountRate: 5,
    pointRate: 1.5,
    isActive: true,
    createdAt: "2023-01-20",
  },
  {
    id: "CG003",
    name: "Khách hàng mới",
    description: "Khách hàng mới đăng ký",
    memberCount: 120,
    discountRate: 2,
    pointRate: 1,
    isActive: true,
    createdAt: "2023-02-01",
  },
  {
    id: "CG004",
    name: "Khách hàng sinh nhật tháng 5",
    description: "Khách hàng có sinh nhật trong tháng 5",
    memberCount: 18,
    discountRate: 15,
    pointRate: 2,
    isActive: true,
    createdAt: "2023-05-01",
  },
  {
    id: "CG005",
    name: "Khách hàng doanh nghiệp",
    description: "Khách hàng là doanh nghiệp, công ty",
    memberCount: 12,
    discountRate: 8,
    pointRate: 1.5,
    isActive: true,
    createdAt: "2023-03-10",
  },
  {
    id: "CG006",
    name: "Khách hàng không hoạt động",
    description: "Khách hàng không có giao dịch trong 6 tháng",
    memberCount: 75,
    discountRate: 0,
    pointRate: 0.5,
    isActive: false,
    createdAt: "2023-04-15",
  },
]

export default function CustomerGroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  
  // Lọc nhóm khách hàng theo từ khóa tìm kiếm
  const filteredGroups = customerGroupData.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Mở dialog chỉnh sửa nhóm
  const handleEditGroup = (group) => {
    setSelectedGroup(group)
    setIsEditGroupOpen(true)
  }

  return (
    <div className="container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Nhóm khách hàng</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm nhóm..."
              className="pl-8 h-9 md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 gap-1">
                <PlusCircle className="h-4 w-4" />
                Thêm nhóm mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Thêm nhóm khách hàng mới</DialogTitle>
                <DialogDescription>
                  Tạo nhóm khách hàng mới để phân loại và áp dụng chính sách riêng.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="groupName" className="text-right">
                    Tên nhóm
                  </Label>
                  <Input id="groupName" className="col-span-3" placeholder="Nhập tên nhóm khách hàng" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Mô tả
                  </Label>
                  <Textarea id="description" className="col-span-3" placeholder="Nhập mô tả về nhóm khách hàng" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discountRate" className="text-right">
                    Tỷ lệ giảm giá (%)
                  </Label>
                  <Input id="discountRate" type="number" className="col-span-3" placeholder="Nhập tỷ lệ giảm giá" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pointRate" className="text-right">
                    Tỷ lệ tích điểm
                  </Label>
                  <Input id="pointRate" type="number" step="0.1" className="col-span-3" placeholder="Nhập tỷ lệ tích điểm" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isActive" className="text-right">
                    Kích hoạt
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="isActive" defaultChecked />\
\
