"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import {
  Bot,
  Send,
  ImageIcon,
  BarChart3,
  Lightbulb,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Loader2,
  ChevronRight,
  Mic,
  X,
  Warehouse,
  Users,
  Tag,
  UserCircle,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

interface SuggestionCategory {
  name: string
  icon: React.ReactNode
  suggestions: string[]
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý AI của hệ thống POS. Tôi có thể giúp bạn phân tích dữ liệu bán hàng, tạo báo cáo, quản lý kho hàng, và nhiều việc khác. Bạn cần hỗ trợ gì?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const suggestionCategories: SuggestionCategory[] = [
    {
      name: "Phân tích dữ liệu",
      icon: <BarChart3 className="h-4 w-4" />,
      suggestions: [
        "Phân tích doanh thu trong tháng này",
        "So sánh doanh số bán hàng giữa tháng này và tháng trước",
        "Sản phẩm nào bán chạy nhất trong tuần qua?",
        "Thời điểm nào trong ngày có doanh số cao nhất?",
        "Phân tích tỷ lệ chuyển đổi của khách hàng",
        "Dự báo doanh thu cho tháng tới",
      ],
    },
    {
      name: "Quản lý kho",
      icon: <Warehouse className="h-4 w-4" />,
      suggestions: [
        "Những sản phẩm nào sắp hết hàng?",
        "Tạo báo cáo tồn kho hiện tại",
        "Dự báo nhu cầu sản phẩm trong tháng tới",
        "Tối ưu hóa mức tồn kho cho các sản phẩm chính",
        "Phân tích vòng quay hàng tồn kho",
        "Đề xuất kế hoạch nhập hàng tối ưu",
      ],
    },
    {
      name: "Khách hàng",
      icon: <Users className="h-4 w-4" />,
      suggestions: [
        "Phân tích hành vi mua hàng của khách hàng VIP",
        "Tạo chương trình khuyến mãi cho khách hàng thân thiết",
        "Những khách hàng nào có khả năng quay lại cao nhất?",
        "Đề xuất chiến lược giữ chân khách hàng",
        "Phân tích tỷ lệ hài lòng của khách hàng",
        "Tìm kiếm khách hàng tiềm năng dựa trên dữ liệu hiện có",
      ],
    },
    {
      name: "Khuyến mãi",
      icon: <Tag className="h-4 w-4" />,
      suggestions: [
        "Đề xuất chương trình khuyến mãi hiệu quả",
        "Phân tích hiệu quả của các chương trình khuyến mãi hiện tại",
        "Tạo mã giảm giá cho khách hàng mới",
        "Đề xuất chiến lược giảm giá theo mùa",
        "Tối ưu hóa chương trình tích điểm khách hàng",
        "Phân tích ROI của các chiến dịch marketing",
      ],
    },
    {
      name: "Nhân viên",
      icon: <UserCircle className="h-4 w-4" />,
      suggestions: [
        "Phân tích hiệu suất của nhân viên bán hàng",
        "Đề xuất lịch làm việc tối ưu",
        "Tính toán hoa hồng cho nhân viên",
        "Đánh giá KPI của nhân viên",
        "Phân tích tỷ lệ nghỉ việc và đề xuất giải pháp",
        "Tối ưu hóa phân công nhiệm vụ",
      ],
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Sử dụng AI SDK để tạo phản hồi
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Bạn là trợ lý AI của hệ thống POS. Người dùng hỏi: ${input}. 
        Hãy trả lời ngắn gọn, hữu ích và chuyên nghiệp. 
        Nếu liên quan đến dữ liệu, hãy cung cấp phân tích và đề xuất. 
        Nếu liên quan đến giao diện, hãy đưa ra gợi ý cải thiện.
        Trả lời bằng tiếng Việt.`,
        system:
          "Bạn là trợ lý AI chuyên nghiệp cho hệ thống POS, giúp phân tích dữ liệu, quản lý kho hàng, và tối ưu hóa giao diện người dùng.",
      })

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      toast({
        title: "Lỗi",
        description: "Không thể tạo phản hồi. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
    toast({
      title: "Đã sao chép",
      description: "Nội dung đã được sao chép vào clipboard",
    })
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Xin chào! Tôi là trợ lý AI của hệ thống POS. Tôi có thể giúp bạn phân tích dữ liệu bán hàng, tạo báo cáo, quản lý kho hàng, và nhiều việc khác. Bạn cần hỗ trợ gì?",
        timestamp: new Date(),
      },
    ])
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      toast({
        title: "Ghi âm đã dừng",
        description: "Chức năng ghi âm hiện đang được phát triển",
      })
    } else {
      setIsRecording(true)
      toast({
        title: "Đang ghi âm",
        description: "Hãy nói yêu cầu của bạn...",
      })
      // Giả lập ghi âm trong 3 giây
      setTimeout(() => {
        setIsRecording(false)
        toast({
          title: "Ghi âm đã dừng",
          description: "Chức năng ghi âm hiện đang được phát triển",
        })
      }, 3000)
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b bg-card p-4">
        <div>
          <h1 className="text-2xl font-bold">Trợ lý ảo</h1>
          <p className="text-muted-foreground">Trợ lý thông minh cho hệ thống POS của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={clearChat} title="Xóa cuộc trò chuyện">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
          <div className="border-b bg-white px-4">
            <TabsList className="h-12">
              <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:bg-primary/10">
                <Bot className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2 data-[state=active]:bg-primary/10">
                <Lightbulb className="h-4 w-4" />
                <span>Gợi ý</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="chat"
            className="flex-1 overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} relative group fade-in-delay-${index % 3}`}
                  >
                    <Card
                      className={`max-w-[80%] overflow-hidden ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                      } shadow-sm transition-colors`}
                    >
                      <div className="p-3">
                        <div className="flex items-start gap-2">
                          {message.role === "assistant" && (
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Bot className="h-3 w-3" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="prose prose-sm dark:prose-invert">
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <div
                              className={`mt-1 text-xs ${
                                message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                      {message.role === "assistant" && (
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="absolute right-2 top-2 hidden rounded-md p-1 text-muted-foreground hover:bg-muted-foreground/10 group-hover:flex"
                          title="Sao chép"
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </Card>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <Card className="max-w-[80%] bg-muted p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Bot className="h-3 w-3" />
                        </div>
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      </div>
                    </Card>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t bg-background p-4">
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <div className="relative flex-1">
                  <Textarea
                    placeholder="Nhập câu hỏi hoặc yêu cầu của bạn..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[60px] resize-none pr-10 pt-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={`absolute bottom-2 right-2 h-6 w-6 rounded-full ${
                      isRecording ? "bg-red-500 text-white hover:bg-red-600" : ""
                    }`}
                    onClick={toggleRecording}
                    disabled={isLoading}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="h-[60px] w-[60px] shrink-0 rounded-full button-ripple"
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent
            value="suggestions"
            className="flex-1 overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {suggestionCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="font-semibold">{category.name}</h3>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      {category.suggestions.map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          className="justify-start text-left"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <ChevronRight className="mr-2 h-4 w-4 text-muted-foreground" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <h3 className="font-semibold">Tính năng nâng cao</h3>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <Button
                      variant="outline"
                      className="justify-start text-left"
                      onClick={() => handleSuggestionClick("Tạo báo cáo doanh thu theo biểu đồ")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                      Tạo báo cáo doanh thu theo biểu đồ
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start text-left"
                      onClick={() => handleSuggestionClick("Phân tích xu hướng mua hàng của khách")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                      Phân tích xu hướng mua hàng của khách
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start text-left"
                      onClick={() => handleSuggestionClick("Tối ưu hóa bố cục giao diện POS")}
                    >
                      <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      Tối ưu hóa bố cục giao diện POS
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start text-left"
                      onClick={() => handleSuggestionClick("Dự báo doanh thu tuần tới")}
                    >
                      <RefreshCw className="mr-2 h-4 w-4 text-muted-foreground" />
                      Dự báo doanh thu tuần tới
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
