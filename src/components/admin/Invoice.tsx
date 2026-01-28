import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, X } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status: string;
  shipping_address: string | null;
  payment_method: string | null;
  notes: string | null;
  profile?: {
    company_name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
}

interface InvoiceProps {
  order: Order;
  orderItems: OrderItem[];
  onClose: () => void;
}

const Invoice = ({ order, orderItems, onClose }: InvoiceProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const invoiceNumber = `INV-${order.id.slice(0, 8).toUpperCase()}`;
  const invoiceDate = formatDate(order.created_at);
  const dueDate = formatDate(
    new Date(new Date(order.created_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
  );

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && invoiceRef.current) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice ${invoiceNumber}</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #1a1a2e;
                background: white;
                padding: 40px;
              }
              .invoice-container {
                max-width: 800px;
                margin: 0 auto;
              }
              .invoice-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 40px;
                padding-bottom: 20px;
                border-bottom: 2px solid #0ea5e9;
              }
              .company-info h1 {
                font-size: 28px;
                color: #0ea5e9;
                margin-bottom: 8px;
              }
              .company-info p {
                font-size: 12px;
                color: #666;
                line-height: 1.5;
              }
              .invoice-title {
                text-align: right;
              }
              .invoice-title h2 {
                font-size: 32px;
                color: #1a1a2e;
                margin-bottom: 8px;
              }
              .invoice-title p {
                font-size: 14px;
                color: #666;
              }
              .invoice-details {
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
              }
              .bill-to, .invoice-info {
                flex: 1;
              }
              .bill-to h3, .invoice-info h3 {
                font-size: 12px;
                text-transform: uppercase;
                color: #999;
                margin-bottom: 8px;
                letter-spacing: 1px;
              }
              .bill-to p, .invoice-info p {
                font-size: 14px;
                line-height: 1.6;
                color: #333;
              }
              .invoice-info {
                text-align: right;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
              }
              thead {
                background: #f8fafc;
              }
              th {
                padding: 12px 16px;
                text-align: left;
                font-size: 12px;
                text-transform: uppercase;
                color: #666;
                border-bottom: 2px solid #e2e8f0;
              }
              th:last-child, td:last-child {
                text-align: right;
              }
              th:nth-child(2), td:nth-child(2) {
                text-align: center;
              }
              td {
                padding: 16px;
                border-bottom: 1px solid #e2e8f0;
                font-size: 14px;
              }
              .totals {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 40px;
              }
              .totals-table {
                width: 280px;
              }
              .totals-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                font-size: 14px;
              }
              .totals-row.total {
                border-top: 2px solid #1a1a2e;
                padding-top: 12px;
                font-size: 18px;
                font-weight: bold;
              }
              .payment-info {
                background: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
              }
              .payment-info h3 {
                font-size: 14px;
                color: #1a1a2e;
                margin-bottom: 12px;
              }
              .payment-info p {
                font-size: 13px;
                color: #666;
                line-height: 1.6;
              }
              .footer {
                text-align: center;
                padding-top: 30px;
                border-top: 1px solid #e2e8f0;
              }
              .footer p {
                font-size: 12px;
                color: #999;
              }
              @media print {
                body { padding: 20px; }
                .invoice-container { max-width: 100%; }
              }
            </style>
          </head>
          <body>
            ${invoiceRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleDownload = () => {
    handlePrint();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Controls */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div className="flex gap-2">
            <Button onClick={handlePrint} size="sm" variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownload} size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          <Button onClick={onClose} size="sm" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Invoice Content */}
        <div ref={invoiceRef} className="p-8 bg-white text-foreground">
          <div className="invoice-container">
            {/* Header */}
            <div className="flex justify-between items-start mb-10 pb-5 border-b-2 border-primary">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Pharmoo World</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Global Pharmaceutical Supplier<br />
                  contact@pharmooworld.com<br />
                  www.pharmooworld.com
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-light text-foreground mb-2">INVOICE</h2>
                <p className="text-sm text-muted-foreground">{invoiceNumber}</p>
              </div>
            </div>

            {/* Bill To & Invoice Info */}
            <div className="flex justify-between mb-10">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Bill To</h3>
                <p className="text-sm leading-relaxed">
                  <strong>{order.profile?.company_name || "Guest Customer"}</strong><br />
                  {order.profile?.email && <>{order.profile.email}<br /></>}
                  {order.profile?.phone && <>{order.profile.phone}<br /></>}
                  {order.shipping_address && <>{order.shipping_address}</>}
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Invoice Details</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Invoice Date:</strong> {invoiceDate}<br />
                  <strong>Due Date:</strong> {dueDate}<br />
                  <strong>Payment Method:</strong> {order.payment_method?.replace("_", " ").toUpperCase() || "TBD"}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="p-3 text-left text-xs uppercase tracking-wider text-muted-foreground border-b-2">Description</th>
                  <th className="p-3 text-center text-xs uppercase tracking-wider text-muted-foreground border-b-2">Qty</th>
                  <th className="p-3 text-right text-xs uppercase tracking-wider text-muted-foreground border-b-2">Unit Price</th>
                  <th className="p-3 text-right text-xs uppercase tracking-wider text-muted-foreground border-b-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b">{item.product_name}</td>
                    <td className="p-4 border-b text-center">{item.quantity}</td>
                    <td className="p-4 border-b text-right">{formatCurrency(Number(item.price))}</td>
                    <td className="p-4 border-b text-right font-medium">
                      {formatCurrency(Number(item.price) * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-10">
              <div className="w-72">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(Number(order.total))}</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated Separately</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-foreground mt-2">
                  <span className="text-lg font-bold">Total Due</span>
                  <span className="text-lg font-bold">{formatCurrency(Number(order.total))}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-secondary/30 p-5 rounded-lg mb-8">
              <h3 className="font-semibold mb-3">Payment Information</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Please remit payment within 30 days of the invoice date. For bank transfer payments, 
                our banking details will be provided upon order confirmation. For cryptocurrency payments, 
                wallet addresses will be shared separately.
              </p>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Order Notes</h3>
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-8 border-t">
              <p className="text-xs text-muted-foreground">
                Thank you for your business! | Questions? Contact support@pharmooworld.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;