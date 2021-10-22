/* fileName: contacting.ts
 Student Name:Sina Pazhwak
 Student ID:301033560
 Date:2021-10-0-22 */

import express from "express";
import {
  DisplayContactingListPage,
  DisplayContactingEditPage,
  ProcessContactEditPage,
  ProcessContactDeletePage,
} from "../Controllers/contacting";
const router = express.Router();
export default router;

import { AuthGuard } from "../Util/index";

router.get("/", DisplayContactingListPage);

router.get("/update/:id", AuthGuard, DisplayContactingEditPage);

/* POST - process /list/edit/:id page */
router.post("/update/:id", AuthGuard, ProcessContactEditPage);

/* GET - process /list/delete/:id */
router.get("/delete/:id", AuthGuard, ProcessContactDeletePage);
