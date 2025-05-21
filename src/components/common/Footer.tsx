import Link from "next/link";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-[#1a5683] text-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and company info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-white flex items-center justify-center mr-3">
                <div className="w-8 h-8 bg-[#1a5683]"></div>
              </div>
              <div>
                <div className="text-white text-2xl font-bold">DOER</div>
                <div className="text-white text-sm">ADMISSION</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-medium">DOER SERVICES PLC</p>
              <p>2B-Dajusha, McAbeel</p>
              <p>EMAIL: demo@doer.com</p>
              <p>Phone: +88 123 4567 8788</p>
              <p>All rights reserved | DOER Services PLC | 2025</p>
            </div>
          </div>

          {/* Join us and social links */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Join Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <YoutubeFilled className="text-2xl hover:text-gray-300" />
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FacebookFilled className="text-2xl hover:text-gray-300" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <TwitterOutlined className="text-2xl hover:text-gray-300" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <InstagramOutlined className="text-2xl hover:text-gray-300" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedinFilled className="text-2xl hover:text-gray-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className="border-t border-blue-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            DOER © 2024. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy-policy" className="hover:underline">
              PRIVACY POLICY
            </Link>
            <Link href="/terms-condition" className="hover:underline">
              TERMS & CONDITION
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
