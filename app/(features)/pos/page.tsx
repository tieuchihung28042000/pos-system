"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Printer,
  ReceiptText,
  User,
  ChevronDown,
  ScanBarcodeIcon as BarcodeScan,
  Mail,
  MessageSquare,
  Star,
} from "lucide-react"

// Định nghĩa kiểu dữ liệu
interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  barcode?: string
  sku?: string
  stock: number
  rating?: number
}

interface CartItem extends Product {
  quantity: number
  discount?: number
  discountType?: "percent" | "amount"
  note?: string
}

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  group?: string
  points: number
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
}

export default function POSSystem() {
  // Danh sách sản phẩm mẫu
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Burger King Special",
      price: 89000,
      category: "burger",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420066",
      sku: "BG001",
      stock: 100,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Burger Classic",
      price: 69000,
      category: "burger",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420073",
      sku: "BG002",
      stock: 100,
      rating: 4.5,
    },
    {
      id: "3",
      name: "Salad Lunch",
      price: 59000,
      category: "salad",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420080",
      sku: "SL001",
      stock: 50,
      rating: 4.7,
    },
    {
      id: "4",
      name: "Healthy Salad",
      price: 65000,
      category: "salad",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420097",
      sku: "SL002",
      stock: 50,
      rating: 4.6,
    },
    {
      id: "5",
      name: "Spinach Salad",
      price: 55000,
      category: "salad",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420103",
      sku: "SL003",
      stock: 50,
      rating: 4.4,
    },
    {
      id: "6",
      name: "Chicken Burger",
      price: 75000,
      category: "burger",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420110",
      sku: "BG003",
      stock: 80,
      rating: 4.6,
    },
    {
      id: "7",
      name: "Beef Burger",
      price: 85000,
      category: "burger",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420127",
      sku: "BG004",
      stock: 80,
      rating: 4.7,
    },
    {
      id: "8",
      name: "Veggie Burger",
      price: 65000,
      category: "burger",
      image: "/placeholder.svg?height=120&width=120",
      barcode: "8938505420134",
      sku: "BG005",
      stock: 60,
      rating: 4.3,
    },
  ])

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", name: "Nguyễn Văn A", phone: "0901234567", email: "nguyenvana@example.com", group: "VIP", points: 120 },
    {
      id: "2",
      name: "Trần Thị B",
      phone: "0912345678",
      email: "tranthib@example.com",
      group: "Thân thiết",
      points: 85,
    },
    { id: "3", name: "Lê Văn C", phone: "0923456789", email: "levanc@example.com", group: "Mới", points: 10 },
  ])

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cash",
      name: "Tiền mặt",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.98 16.17 15.98 14.56C15.98 12.36 14.07 11.6 12.31 11.14Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    { id: "card", name: "Thẻ tín dụng", icon: <CreditCard className="h-5 w-5" /> },
    {
      id: "transfer",
      name: "Chuyển khoản",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 14V6C19 4.9 18.1 4 17 4H3C1.9 4 1 4.9 1 6V14C1 15.1 1.9 16 3 16H17C18.1 16 19 15.1 19 14ZM17 14H3V6H17V14ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7ZM23 7V18C23 19.1 22.1 20 21 20H4C4 19 4 19 4 18H21V7C22.1 7 22.1 7 23 7Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "momo",
      name: "Ví MoMo",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="12" fill="#A50064" />
          <path
            d="M7 7.5C7 6.67 7.67 6 8.5 6H15.5C16.33 6 17 6.67 17 7.5V16.5C17 17.33 16.33 18 15.5 18H8.5C7.67 18 7 17.33 7 16.5V7.5ZM9 9C9 10.1 9.9 11 11 11C12.1 11 13 10.1 13 9C13 7.9 12.1 7 11 7C9.9 7 9 7.9 9 9ZM15 15C15 13.34 13.66 12 12 12H10C8.34 12 7 13.34 7 15V17H15V15Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: "points",
      name: "Điểm tích lũy",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ]

  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showPayment, setShowPayment] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [orderNote, setOrderNote] = useState("")
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{ method: string; amount: number }[]>([])
  const [partialPayment, setPartialPayment] = useState(false)
  const [barcodeInput, setBarcodeInput] = useState("")
  const [isAddingCustomer, setIsAddingCustomer] = useState(false)
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: "",
    phone: "",
    email: "",
    group: "Mới",
    points: 0,
  })
  const [discountDialogOpen, setDiscountDialogOpen] = useState(false)
  const [currentItemForDiscount, setCurrentItemForDiscount] = useState<CartItem | null>(null)
  const [discountAmount, setDiscountAmount] = useState<string>("0")
  const [discountType, setDiscountType] = useState<"percent" | "amount">("percent")

  // Lọc sản phẩm theo danh mục và tìm kiếm
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm)) ||
      (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null)
    })
  }

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Cập nhật ghi chú cho sản phẩm
  const updateItemNote = (id: string, note: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, note }
        }
        return item
      })
    })
  }

  // Áp dụng giảm giá cho sản phẩm
  const applyDiscount = () => {
    if (!currentItemForDiscount) return

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === currentItemForDiscount.id) {
          return {
            ...item,
            discount: Number.parseFloat(discountAmount) || 0,
            discountType,
          }
        }
        return item
      })
    })

    setDiscountDialogOpen(false)
  }

  // Tính giá sau khi giảm giá cho một sản phẩm
  const calculateDiscountedPrice = (item: CartItem) => {
    if (!item.discount) return item.price

    if (item.discountType === "percent") {
      return item.price * (1 - item.discount / 100)
    } else {
      return Math.max(0, item.price - item.discount)
    }
  }

  // Tính tổng tiền cho một sản phẩm (đã nhân với số lượng và áp dụng giảm giá)
  const calculateItemTotal = (item: CartItem) => {
    return calculateDiscountedPrice(item) * item.quantity
  }

  // Tính tổng tiền
  const subtotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  const tax = subtotal * 0.1 // 10% thuế
  const total = subtotal + tax

  // Xử lý thanh toán
  const handleCheckout = () => {
    setShowPayment(true)
    // Khởi tạo phương thức thanh toán mặc định
    setSelectedPaymentMethods([{ method: "cash", amount: total }])
  }

  const handlePayment = () => {
    setShowPayment(false)
    setShowReceipt(true)
  }

  const handleNewOrder = () => {
    setCart([])
    setShowReceipt(false)
    setSelectedCustomer(null)
    setOrderNote("")
    setSelectedPaymentMethods([])
    setPartialPayment(false)
  }

  // Xử lý thêm khách hàng mới
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) return

    const newCustomerId = `${customers.length + 1}`
    const customerToAdd: Customer = {
      id: newCustomerId,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email || "",
      group: newCustomer.group || "Mới",
      points: 0,
    }

    setCustomers([...customers, customerToAdd])
    setSelectedCustomer(customerToAdd)
    setIsAddingCustomer(false)
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      group: "Mới",
      points: 0,
    })
  }

  // Xử lý quét mã vạch
  const handleBarcodeSearch = () => {
    if (!barcodeInput) return

    const product = products.find((p) => p.barcode === barcodeInput)
    if (product) {
      addToCart(product)
      setBarcodeInput("")
    }
  }

  // Xử lý khi nhấn Enter trong ô tìm kiếm mã vạch
  const handleBarcodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBarcodeSearch()
    }
  }

  // Xử lý phương thức thanh toán
  const handlePaymentMethodChange = (methodId: string, amount: number, index: number) => {
    setSelectedPaymentMethods((prev) => {
      const updated = [...prev]
      updated[index] = { method: methodId, amount }
      return updated
    })
  }

  const addPaymentMethod = () => {
    setSelectedPaymentMethods((prev) => [...prev, { method: "cash", amount: 0 }])
  }

  const removePaymentMethod = (index: number) => {
    setSelectedPaymentMethods((prev) => prev.filter((_, i) => i !== index))
  }

  // Tính tổng tiền đã thanh toán
  const totalPaid = selectedPaymentMethods.reduce((sum, method) => sum + method.amount, 0)

  // Tính tiền còn thiếu
  const remainingAmount = total - totalPaid

  // Format tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Focus vào ô tìm kiếm mã vạch khi component được render
  useEffect(() => {
    const barcodeInput = document.getElementById("barcode-input")
    if (barcodeInput) {
      barcodeInput.focus()
    }
  }, [])

  // Render star rating
  const renderRating = (rating = 0) => {
    return (
      <div className="flex items-center">
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        <span className="ml-1 text-xs">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Phần danh sách sản phẩm */}
      <div className="flex-1 p-4 overflow-hidden bg-background">
        <div className="flex flex-col gap-4">
          {/* Promotional banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="promo-card bg-primary text-primary-foreground">
              <h3 className="text-lg font-bold">Get Discount</h3>
              <p className="text-2xl font-bold">Up to 20%</p>
            </div>
            <div className="promo-card bg-success text-success-foreground">
              <h3 className="text-lg font-bold">Healthy Food</h3>
              <p className="text-2xl font-bold">Festival</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm sản phẩm, mã SKU..."
                className="pl-8 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <BarcodeScan className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="barcode-input"
                placeholder="Quét mã vạch..."
                className="pl-8 w-48 rounded-full"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={handleBarcodeKeyDown}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Discover our Menu</h2>
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-card p-1 rounded-full mb-4">
                <TabsTrigger value="all" className="rounded-full">
                  Tất cả
                </TabsTrigger>
                <TabsTrigger value="burger" className="rounded-full">
                  Burger
                </TabsTrigger>
                <TabsTrigger value="salad" className="rounded-full">
                  Salad
                </TabsTrigger>
                <TabsTrigger value="drinks" className="rounded-full">
                  Drinks
                </TabsTrigger>
                <TabsTrigger value="snack" className="rounded-full">
                  Snack
                </TabsTrigger>
                <TabsTrigger value="combo" className="rounded-full">
                  Combo
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="menu-card cursor-pointer" onClick={() => addToCart(product)}>
                      <CardContent className="p-0">
                        <div className="aspect-square w-full overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="menu-title">{product.name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <p className="menu-price">{formatCurrency(product.price)}</p>
                            {product.rating && renderRating(product.rating)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Phần giỏ hàng và thanh toán */}
      <div className="w-96 bg-card border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Tên người dùng</p>
                <p className="text-xs text-muted-foreground">Nhân viên bán hàng</p>
              </div>
            </div>
          </div>

          {/* Phần khách hàng */}
          <div className="mt-3">
            {selectedCustomer ? (
              <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">{selectedCustomer.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedCustomer.phone} • {selectedCustomer.points} điểm
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                  Đổi
                </Button>
              </div>
            ) : (
              <Dialog open={isAddingCustomer} onOpenChange={setIsAddingCustomer}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full rounded-full">
                    <User className="h-4 w-4 mr-2" />
                    Thêm khách hàng
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm khách hàng mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên khách hàng</Label>
                      <Input
                        id="name"
                        placeholder="Nhập tên khách hàng"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (không bắt buộc)</Label>
                      <Input
                        id="email"
                        placeholder="Nhập email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group">Nhóm khách hàng</Label>
                      <Select
                        value={newCustomer.group}
                        onValueChange={(value) => setNewCustomer({ ...newCustomer, group: value })}
                      >
                        <SelectTrigger id="group">
                          <SelectValue placeholder="Chọn nhóm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mới">Mới</SelectItem>
                          <SelectItem value="Thân thiết">Thân thiết</SelectItem>
                          <SelectItem value="VIP">VIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingCustomer(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleAddCustomer}>Thêm khách hàng</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {!showPayment && !showReceipt ? (
          <>
            <ScrollArea className="flex-1 p-4">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Giỏ hàng trống</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="flex items-center space-x-3">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="cart-item-image" />
                        <div>
                          <h4 className="cart-item-title">{item.name}</h4>
                          <div className="flex items-center">
                            <p className="text-sm text-gray-500">
                              {item.discount ? (
                                <>
                                  <span className="line-through mr-1">{formatCurrency(item.price)}</span>
                                  <span className="text-green-600">
                                    {formatCurrency(calculateDiscountedPrice(item))}
                                  </span>
                                </>
                              ) : (
                                formatCurrency(item.price)
                              )}
                            </p>
                            {item.discount && (
                              <Badge variant="outline" className="ml-2 text-xs text-green-600">
                                {item.discountType === "percent"
                                  ? `-${item.discount}%`
                                  : `-${formatCurrency(item.discount)}`}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="cart-item-quantity">
                        <Button
                          variant="outline"
                          size="icon"
                          className="quantity-button"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(item.id, -1)
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="quantity-button"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(item.id, 1)
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-red-500 ml-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromCart(item.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thuế (10%):</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">{formatCurrency(total)}</span>
                </div>
              </div>
              <Button className="w-full rounded-full" size="lg" disabled={cart.length === 0} onClick={handleCheckout}>
                Thanh toán
              </Button>
            </div>
          </>
        ) : showPayment ? (
          <div className="flex-1 p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Thanh toán</h2>

            {/* Thông tin đơn hàng */}
            <div className="bg-muted p-3 rounded-xl mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tổng tiền:</span>
                <span className="font-bold">{formatCurrency(total)}</span>
              </div>
              {selectedCustomer && (
                <div className="flex justify-between text-sm">
                  <span>Khách hàng:</span>
                  <span>{selectedCustomer.name}</span>
                </div>
              )}
            </div>

            {/* Phương thức thanh toán */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Phương thức thanh toán</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setPartialPayment(!partialPayment)}
                >
                  {partialPayment ? "Thanh toán đầy đủ" : "Thanh toán một phần"}
                </Button>
              </div>

              {selectedPaymentMethods.map((paymentMethod, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Select
                    value={paymentMethod.method}
                    onValueChange={(value) => handlePaymentMethodChange(value, paymentMethod.amount, index)}
                  >
                    <SelectTrigger className="w-[180px] rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          <div className="flex items-center">
                            {method.icon}
                            <span className="ml-2">{method.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={paymentMethod.amount}
                    onChange={(e) =>
                      handlePaymentMethodChange(paymentMethod.method, Number.parseFloat(e.target.value) || 0, index)
                    }
                    disabled={!partialPayment && index === 0}
                    className="rounded-full"
                  />
                  {partialPayment && selectedPaymentMethods.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removePaymentMethod(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              {partialPayment && (
                <Button variant="outline" size="sm" onClick={addPaymentMethod} className="mt-2 rounded-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm phương thức
                </Button>
              )}
            </div>

            {/* Thông tin thanh toán */}
            <div className="space-y-2 mb-6 bg-muted p-3 rounded-xl">
              <div className="flex justify-between">
                <span>Tổng cộng:</span>
                <span className="font-bold">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Đã thanh toán:</span>
                <span className="font-bold">{formatCurrency(totalPaid)}</span>
              </div>
              {partialPayment && (
                <div className="flex justify-between">
                  <span>Còn lại:</span>
                  <span className="font-bold text-red-500">{formatCurrency(remainingAmount)}</span>
                </div>
              )}
            </div>

            <div className="mt-auto">
              <Button
                className="w-full mb-2 rounded-full"
                size="lg"
                onClick={handlePayment}
                disabled={partialPayment && remainingAmount > 0 && remainingAmount === total}
              >
                {partialPayment && remainingAmount > 0 ? "Thanh toán một phần" : "Hoàn tất thanh toán"}
              </Button>
              <Button variant="outline" className="w-full rounded-full" onClick={() => setShowPayment(false)}>
                Quay lại
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-4 flex flex-col">
            <div className="text-center mb-4">
              <ReceiptText className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <h2 className="text-xl font-bold">Thanh toán thành công</h2>
              {partialPayment && remainingAmount > 0 && (
                <p className="text-amber-500">Thanh toán một phần - Còn lại: {formatCurrency(remainingAmount)}</p>
              )}
            </div>
            <div className="border rounded-xl p-4 mb-6">
              <h3 className="font-bold text-center mb-2">Hóa đơn</h3>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                      {item.discount && (
                        <span className="text-green-600 ml-1">
                          (
                          {item.discountType === "percent" ? `-${item.discount}%` : `-${formatCurrency(item.discount)}`}
                          )
                        </span>
                      )}
                    </span>
                    <span>{formatCurrency(calculateItemTotal(item))}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Thuế (10%):</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">{formatCurrency(total)}</span>
                </div>
                {selectedPaymentMethods.length > 0 && (
                  <>
                    <Separator />
                    <div className="text-sm font-medium">Thanh toán:</div>
                    {selectedPaymentMethods.map((method, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{paymentMethods.find((m) => m.id === method.method)?.name || method.method}:</span>
                        <span>{formatCurrency(method.amount)}</span>
                      </div>
                    ))}
                    {partialPayment && remainingAmount > 0 && (
                      <div className="flex justify-between text-sm text-red-500">
                        <span>Còn lại:</span>
                        <span>{formatCurrency(remainingAmount)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              {selectedCustomer && (
                <div className="text-sm mb-2">
                  <div className="font-medium">Khách hàng:</div>
                  <div>
                    {selectedCustomer.name} - {selectedCustomer.phone}
                  </div>
                </div>
              )}
              {orderNote && (
                <div className="text-sm">
                  <div className="font-medium">Ghi chú:</div>
                  <div>{orderNote}</div>
                </div>
              )}
            </div>
            <div className="mt-auto space-y-2">
              <div className="flex space-x-2">
                <Button className="flex-1 rounded-full" variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  In hóa đơn
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 rounded-full">
                      <ReceiptText className="mr-2 h-4 w-4" />
                      Gửi hóa đơn <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Gửi qua Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Gửi qua Zalo</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button className="w-full rounded-full" onClick={handleNewOrder}>
                Đơn hàng mới
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
