-- Add INSERT policy: Users can only insert order items for their own orders
CREATE POLICY "Users can insert order items for their own orders"
ON public.order_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Add INSERT policy: Admins can insert order items for any order
CREATE POLICY "Admins can insert order items"
ON public.order_items
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Add UPDATE policy: Only admins can update order items (for order management)
CREATE POLICY "Admins can update order items"
ON public.order_items
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Add DELETE policy: Only admins can delete order items
CREATE POLICY "Admins can delete order items"
ON public.order_items
FOR DELETE
USING (has_role(auth.uid(), 'admin'));