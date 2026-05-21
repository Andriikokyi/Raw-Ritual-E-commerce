import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.slug === action.item.slug)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.slug === action.item.slug
              ? { ...i, qty: i.qty + (action.item.qty ?? 1) }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: action.item.qty ?? 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.slug !== action.slug) }
    case 'SET_QTY':
      return {
        ...state,
        items: state.items
          .map(i => i.slug === action.slug ? { ...i, qty: action.qty } : i)
          .filter(i => i.qty > 0),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product, qty = 1) => {
    dispatch({
      type: 'ADD',
      item: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        priceDisplay: product.priceDisplay,
        image: product.images?.[0] ?? product.image,
        categoryLabel: product.categoryLabel,
        qty,
      },
    })
    setIsOpen(true)
  }

  const removeItem = (slug) => dispatch({ type: 'REMOVE', slug })
  const setQty = (slug, qty) => dispatch({ type: 'SET_QTY', slug, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const itemCount = state.items.reduce((s, i) => s + i.qty, 0)
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      setQty,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
