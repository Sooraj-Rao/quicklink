import React from "react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode, X } from "lucide-react";

const QRCodeView = ({
  value,
  setQrDisply,
}: {
  value: string;
  setQrDisply: (val: boolean) => void;
}) => {
  return (
    <div>
      <Dialog open={value ? true : false} onOpenChange={setQrDisply}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan this QR code to follow the link</DialogTitle>
            <DialogDescription>
              <div className="  flex justify-center py-4">
                <QRCode
                  size={250}
                  className=" w-40 h-40 sm:h-fit border-foreground/20  sm:w-fit border-2 shadow-md rounded-lg  p-2"
                  value={value}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodeView;
