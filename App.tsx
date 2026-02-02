import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AiAssistant from './components/AiAssistant';
import Footer from './components/Footer';
import PaymentModal from './components/PaymentModal';
import OrderStatusModal from './components/OrderStatusModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import TelegramConfigModal from './components/TelegramConfigModal';
import { Product, CartItem, Order } from './types';
import { sendTelegramOrder, saveTelegramConfig, getTelegramConfig } from './services/telegramService';
import { X, Lock, Package, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // State untuk Order History & Tracking
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // State untuk Konfigurasi Telegram
  const [showTelegramConfig, setShowTelegramConfig] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
  
  // State Status Koneksi Bot (Optional, untuk UI)
  const [isBotConnected, setIsBotConnected] = useState(false);

  useEffect(() => {
    setIsBotConnected(!!getTelegramConfig());
  }, []);

  // Simulasi progress pesanan (REALISTIS & MULTI-ORDER)
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(currentOrders => {
        let hasChanges = false;
        const updatedOrders = currentOrders.map(order => {
          if (order.status === 'confirmed') {
            const timeDiff = new Date().getTime() - order.date.getTime();
            if (timeDiff > 5000) {
              hasChanges = true;
              return { ...order, status: 'baking' as const };
            }
          }
          return order;
        });
        return hasChanges ? updatedOrders : currentOrders;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      const updated = orders.find(o => o.id === selectedOrder.id);
      if (updated && updated.status !== selectedOrder.status) {
        setSelectedOrder(updated);
      }
    }
  }, [orders, selectedOrder]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutSuccess = async (method: 'bank' | 'cod', details: { name: string; email: string; address: string; tax: number; shipping: number; grandTotal: number }) => {
    const frozenItems = cart.map(item => ({ ...item }));
    
    const newOrder: Order = {
      id: `PAO-${Math.floor(Math.random() * 10000)}`,
      items: frozenItems,
      total: details.grandTotal,
      subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      tax: details.tax,
      shipping: details.shipping,
      status: 'confirmed',
      method: method,
      date: new Date(),
      customerName: details.name,
      customerAddress: details.address,
      customerEmail: details.email
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); 
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setSelectedOrder(newOrder);

    // Kirim Notifikasi Telegram
    try {
      await sendTelegramOrder(newOrder);
      // Jika berhasil, pastikan status koneksi update
      setIsBotConnected(true);
    } catch (error: any) {
      if (error.message === 'MISSING_CHAT_ID') {
        // Jika gagal auto-detect, baru minta user
        setPendingOrder(newOrder);
        setShowTelegramConfig(true);
      } else {
        console.error("Gagal mengirim Telegram:", error);
      }
    }
  };

  const handleTelegramConfigSave = async (chatId: string) => {
    saveTelegramConfig(chatId);
    setShowTelegramConfig(false);
    setIsBotConnected(true);
    
    if (pendingOrder) {
      try {
        await sendTelegramOrder(pendingOrder);
        alert(`Sukses! Pesanan #${pendingOrder.id} berhasil diteruskan ke Telegram.`);
        setPendingOrder(null);
      } catch (error) {
        alert("Chat ID tersimpan, tapi gagal mengirim pesan. Pastikan bot tidak diblokir.");
      }
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-pao-50 scroll-smooth relative">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <ProductGrid addToCart={addToCart} />
        <AiAssistant />
      </main>

      <Footer />

      {/* Bot Status Indicator (Floating Small) */}
      {!isBotConnected && (
        <button 
           onClick={() => setShowTelegramConfig(true)}
           className="fixed bottom-6 left-6 z-40 bg-white p-3 rounded-full shadow-xl border-2 border-dashed border-gray-300 hover:border-[#0088cc] hover:text-[#0088cc] text-gray-400 transition-all flex items-center gap-2 group animate-slide-up"
           title="Klik untuk setting Bot Telegram"
        >
          <MessageCircle size={20} />
          <span className="text-xs font-bold max-w-0 overflow-hidden group-hover:max-w-xs transition-all whitespace-nowrap">
            Setup Bot
          </span>
        </button>
      )}

      {/* Floating Order History Button */}
      {orders.length > 0 && !isHistoryOpen && !selectedOrder && (
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-white p-4 rounded-full shadow-2xl border-2 border-pao-100 group animate-slide-up flex items-center gap-3 pr-6 hover:border-pao-400 transition-colors"
        >
          <div className="relative">
             <div className="bg-pao-500 text-white p-2 rounded-full">
                <Package size={24} />
             </div>
             {orders.some(o => o.status !== 'delivered') && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
             )}
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500 font-bold uppercase">Pesanan Kamu</p>
            <p className="text-sm font-bold text-pao-600">
               {orders.length} Transaksi
            </p>
          </div>
        </button>
      )}

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl p-6 flex flex-col animate-slide-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-800">Keranjang Belanja</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p>Keranjang masih kosong nih.</p>
                  <p className="text-sm">Yuk jajan kue dulu! 🧁</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <div className="flex items-center gap-2">
                         <p className="text-pao-400 font-bold">
                           Rp{item.price.toLocaleString('id-ID')}
                         </p>
                         {item.originalPrice && item.originalPrice > item.price && (
                           <span className="text-xs text-gray-400 line-through">
                             Rp{item.originalPrice.toLocaleString('id-ID')}
                           </span>
                         )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 text-xs hover:text-red-600 font-bold"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-100 pt-6 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-600">Subtotal</span>
                <span className="text-2xl font-display font-bold text-pao-500">
                  Rp{subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-4 text-center">*Pajak dan Ongkir dihitung saat Checkout</p>
              <button 
                className="w-full bg-pao-500 hover:bg-pao-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-pao-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={cart.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
              >
                <Lock size={18} /> Checkout Aman
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secure Checkout Modal */}
      {isCheckoutOpen && (
        <PaymentModal 
          total={subtotal} 
          onClose={() => setIsCheckoutOpen(false)} 
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {/* Order History Modal */}
      {isHistoryOpen && (
        <OrderHistoryModal 
          orders={orders}
          onClose={() => setIsHistoryOpen(false)}
          onSelectOrder={(order) => {
            setIsHistoryOpen(false); // Close history
            setSelectedOrder(order); // Open detail
          }}
        />
      )}

      {/* Order Tracking Detail Modal */}
      {selectedOrder && (
        <OrderStatusModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
          onBack={() => {
            setSelectedOrder(null); // Close detail
            setIsHistoryOpen(true); // Re-open history
          }}
        />
      )}

      {/* Telegram Config Modal (Muncul jika Chat ID belum diset & gagal auto-detect) */}
      {showTelegramConfig && (
        <TelegramConfigModal 
          onClose={() => setShowTelegramConfig(false)}
          onSave={handleTelegramConfigSave}
        />
      )}
    </div>
  );
};

export default App;