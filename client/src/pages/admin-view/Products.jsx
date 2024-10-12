import ImageUpload from "@/components/admin-view/image-upload";
import ProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/commen/form";
import { addProductFormElements } from "@/components/config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { AddProduct, fetchallproducts } from "@/store/adminslice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminProducts() {
  const insitialformData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [openProducts, setProducts] = useState(false);
  const [formdata, setformdata] = useState(insitialformData);
  const [imageFile, setimageFile] = useState(null);
  const [uploadimageUrl, setuploadImageUrl] = useState("");
  const [imageload, setimageload] = useState(false);
  const [curentId, setcurrentId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminproduct);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchallproducts());
  }, [dispatch]);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      AddProduct({
        ...formdata,
        image: uploadimageUrl,
      })
    ).then((data) => {
      setimageFile(null);
      setformdata(insitialformData);
      setProducts(false);
      dispatch(fetchallproducts());
      if (data?.payload.success)
        toast({
          title: "post added",
        });
    });
  }
  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setProducts(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {productList && productList.length > 0
          ? productList.map((addproduct) => (
              <ProductTile
                key={addproduct._id}
                product={addproduct}
                setcurrentId={setcurrentId}
                setProducts={setProducts}
                setformdata={setformdata}
              />
            ))
          : null}
      </div>

      <Sheet open={openProducts} onOpenChange={() => setProducts(false)}>
        <SheetContent className="overflow-auto" side="right">
          <SheetHeader>
            <SheetTitle>Add new product</SheetTitle>
          </SheetHeader>
          <SheetDescription></SheetDescription>
          <div className="py-4">
            <ImageUpload
              imageFile={imageFile}
              setimageFile={setimageFile}
              uploadimageUrl={uploadimageUrl}
              setuploadImageUrl={setuploadImageUrl}
              setimageload={setimageload}
              imageload={imageload}
              isEditmode={curentId !== null}
            />
            <CommonForm
              formcontrols={addProductFormElements}
              onSubmit={onSubmit}
              setformdata={setformdata}
              formdata={formdata}
              buttonText={"Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
