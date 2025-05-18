"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  UploadCloud,
  Trash2,
  Save,
  ArrowLeft,
  ScanBarcodeIcon as BarcodeScan,
  FileText,
  Tag,
  Package,
  Percent,
} from "lucide-react"

export default function AddProductPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    cost: "",
    sku: "",
    barcode: "",
    description: "",
    minStock: "10",
    taxRate: "10",
    weight: "",
    unit: "cái",
    status: "active",
    trackInventory: true,
    hasVariants: false,
    isCombo: false,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData({ ...productData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setProductData({ ...productData, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProductData({ ...productData, [name]: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý lưu sản phẩm
    console.log("Saving product:", productData)
    // Hiển thị thông báo thành công và chuyển hướng
    router.push("/products")
  }

  const generateSKU = () => {
    // Tạo mã SKU tự động
    const prefix = productData.category ? productData.category.substring(0, 2).toUpperCase() : "PR"
    const randomNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    setProductData({ ...productData, sku: `${prefix}${randomNumber}` })
  }

  const generateBarcode = () => {
    // Tạo mã vạch EAN-13 đơn giản
    const prefix = "893" // Prefix cho Việt Nam
    const randomPart = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0")
    setProductData({ ...productData, barcode: `${prefix}${randomPart}` })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
            <p className="text-muted-foreground">Tạo sản phẩm mới cho hệ thống POS của bạn</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/products")}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Lưu sản phẩm
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phần bên trái - Form nhập liệu */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-white w-full h-auto flex-wrap p-1 rounded-xl">
                <TabsTrigger value="basic" className="rounded-lg">
                  <FileText className="mr-2 h-4 w-4" />
                  Thông tin cơ bản
                </TabsTrigger>
                <TabsTrigger value="pricing" className="rounded-lg">
                  <Tag className="mr-2 h-4 w-4" />
                  Giá & Thuế
                </TabsTrigger>
                <TabsTrigger value="inventory" className="rounded-lg">
                  <Package className="mr-2 h-4 w-4" />
                  Kho hàng
                </TabsTrigger>
                <TabsTrigger value="variants" className="rounded-lg">
                  <Percent className="mr-2 h-4 w-4" />
                  Biến thể
                </TabsTrigger>
              </TabsList>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <TabsContent value="basic" className="space-y-4 mt-0">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Tên sản phẩm <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Nhập tên sản phẩm"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Danh mục <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={productData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coffee">Cà phê</SelectItem>
                          <SelectItem value="tea">Trà</SelectItem>
                          <SelectItem value="milk-tea">Trà sữa</SelectItem>
                          <SelectItem value="food">Thức ăn</SelectItem>
                          <SelectItem value="combo">Combo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sku">
                          Mã SKU
                          <Button variant="ghost" size="sm" onClick={generateSKU} className="ml-2 h-6 px-2 text-xs">
                            Tạo tự động
                          </Button>
                        </Label>
                        <Input
                          id="sku"
                          name="sku"
                          placeholder="Nhập mã SKU"
                          value={productData.sku}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="barcode">
                          Mã vạch
                          <Button variant="ghost" size="sm" onClick={generateBarcode} className="ml-2 h-6 px-2 text-xs">
                            Tạo tự động
                          </Button>
                        </Label>
                        <div className="relative">
                          <Input
                            id="barcode"
                            name="barcode"
                            placeholder="Nhập mã vạch"
                            value={productData.barcode}
                            onChange={handleInputChange}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1 h-7 w-7"
                            title="Quét mã vạch"
                          >
                            <BarcodeScan className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả sản phẩm</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Nhập mô tả sản phẩm"
                        className="min-h-[120px]"
                        value={productData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Giá bán <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          placeholder="Nhập giá bán"
                          value={productData.price}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                          VND
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cost">Giá nhập</Label>
                      <div className="relative">
                        <Input
                          id="cost"
                          name="cost"
                          type="number"
                          min="0"
                          placeholder="Nhập giá nhập"
                          value={productData.cost}
                          onChange={handleInputChange}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                          VND
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Thuế suất (%)</Label>
                      <Input
                        id="taxRate"
                        name="taxRate"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Nhập thuế suất"
                        value={productData.taxRate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Đơn vị tính</Label>
                      <Select value={productData.unit} onValueChange={(value) => handleSelectChange("unit", value)}>
                        <SelectTrigger id="unit">
                          <SelectValue placeholder="Chọn đơn vị" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cái">Cái</SelectItem>
                          <SelectItem value="ly">Ly</SelectItem>
                          <SelectItem value="đĩa">Đĩa</SelectItem>
                          <SelectItem value="phần">Phần</SelectItem>
                          <SelectItem value="combo">Combo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4 mt-0">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      id="trackInventory"
                      checked={productData.trackInventory}
                      onCheckedChange={(checked) => handleSwitchChange("trackInventory", checked)}
                    />
                    <Label htmlFor="trackInventory">Theo dõi tồn kho</Label>
                  </div>

                  {productData.trackInventory && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minStock">Tồn kho tối thiểu</Label>
                        <Input
                          id="minStock"
                          name="minStock"
                          type="number"
                          min="0"
                          placeholder="Nhập tồn kho tối thiểu"
                          value={productData.minStock}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Khối lượng (gram)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          min="0"
                          placeholder="Nhập khối lượng"
                          value={productData.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <Label>Trạng thái sản phẩm</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant={productData.status === "active" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleSelectChange("status", "active")}
                      >
                        <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
                        Đang bán
                      </Button>
                      <Button
                        type="button"
                        variant={productData.status === "inactive" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleSelectChange("status", "inactive")}
                      >
                        <span className="bg-red-500 w-2 h-2 rounded-full mr-2"></span>
                        Ngừng bán
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="variants" className="space-y-4 mt-0">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      id="hasVariants"
                      checked={productData.hasVariants}
                      onCheckedChange={(checked) => handleSwitchChange("hasVariants", checked)}
                    />
                    <Label htmlFor="hasVariants">Sản phẩm có nhiều biến thể</Label>
                  </div>

                  {productData.hasVariants ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Sản phẩm này sẽ có nhiều biến thể (ví dụ: kích cỡ, màu sắc, hương vị). Bạn có thể thiết lập các
                        biến thể sau khi tạo sản phẩm.
                      </p>
                      <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                        <Package className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-center text-muted-foreground">
                          Biến thể sản phẩm sẽ được tạo sau khi lưu sản phẩm này
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Switch
                          id="isCombo"
                          checked={productData.isCombo}
                          onCheckedChange={(checked) => handleSwitchChange("isCombo", checked)}
                        />
                        <Label htmlFor="isCombo">Sản phẩm là combo</Label>
                      </div>

                      {productData.isCombo && (
                        <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                          <Package className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-center text-muted-foreground">
                            Thiết lập combo sẽ được tạo sau khi lưu sản phẩm này
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Phần bên phải - Hình ảnh và thông tin tóm tắt */}
          <div className="space-y-6">
            {/* Phần upload hình ảnh */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Hình ảnh sản phẩm</h3>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px]">
                  {imagePreview ? (
                    <div className="relative w-full">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-[200px] object-contain rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 w-7 h-7 rounded-full"
                        onClick={() => setImagePreview(null)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-center text-muted-foreground mb-2">
                        Kéo thả hình ảnh vào đây hoặc click để tải lên
                      </p>
                      <Button variant="outline" size="sm">
                        Chọn hình ảnh
                      </Button>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Hỗ trợ JPG, PNG hoặc GIF. Kích thước tối đa 2MB.</p>
              </CardContent>
            </Card>

            {/* Phần thông tin tóm tắt */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Tóm tắt thông tin</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tên sản phẩm:</span>
                    <span className="font-medium">{productData.name || "Chưa có thông tin"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Danh mục:</span>
                    <span className="font-medium">
                      {productData.category ? getCategoryName(productData.category) : "Chưa chọn"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giá bán:</span>
                    <span className="font-medium">
                      {productData.price ? formatCurrency(Number(productData.price)) : "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giá nhập:</span>
                    <span className="font-medium">
                      {productData.cost ? formatCurrency(Number(productData.cost)) : "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lợi nhuận:</span>
                    <span className="font-medium text-green-600">
                      {productData.price && productData.cost
                        ? formatCurrency(Number(productData.price) - Number(productData.cost))
                        : "Chưa có thông tin"}
                    </span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trạng thái:</span>
                    <span
                      className={`font-medium ${productData.status === "active" ? "text-green-600" : "text-red-600"}`}
                    >
                      {productData.status === "active" ? "Đang bán" : "Ngừng bán"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theo dõi tồn kho:</span>
                    <span className="font-medium">{productData.trackInventory ? "Có" : "Không"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Có biến thể:</span>
                    <span className="font-medium">{productData.hasVariants ? "Có" : "Không"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Lưu sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hàm phụ trợ
const getCategoryName = (category: string) => {
  const categories: Record<string, string> = {
    coffee: "Cà phê",
    tea: "Trà",
    "milk-tea": "Trà sữa",
    food: "Thức ăn",
    combo: "Combo",
  }
  return categories[category] || category
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}
