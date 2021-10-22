/* fileName: contacting.ts
 Student Name:Sina Pazhwak
 Student ID:301033560
 Date:2021-10-0-22 */

import expess, { Request, Response, NextFunction } from "express";
import Contacting from "../Models/contacting";
// import Util Functions
import { UserDisplayName } from "../Util";

export function DisplayContactingListPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Contacting.find(
    {},
    null,
    { sort: { name: 1 } },
    function (err, contactingCollection) {
      if (err) {
        return console.error(err);
      }
      //printing list
      res.render("index", {
        title: "Business Contacts",
        page: "contacting-list",
        contacting: contactingCollection,
        displayName: UserDisplayName(req),
      });
    }
  );
}

// Display the edit page
export function DisplayContactingEditPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let id = req.params.id;

  // send theid to the db

  Contacting.findById(id, {}, {}, (err, contactingItemToEdit) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    // show the edit view
    res.render("index", {
      title: "Update",
      page: "contactingupdate",
      contacting: contactingItemToEdit,
      displayName: UserDisplayName(req),
    });
  });
}

// Process Edit page
export function ProcessContactEditPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let id = req.params.id;

  // make a new Item
  let updatedContactingItem = new Contacting({
    _id: id,
    name: req.body.name,
    number: req.body.number,
    emailAddress: req.body.emailAddress,
  });

  // find the item in the DB and then update it to the new state
  Contacting.updateOne({ _id: id }, updatedContactingItem, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contacting-list");
  });
}

// Process delete page
export function ProcessContactDeletePage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let id = req.params.id;

  // remove({"_id: id"})
  Contacting.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contacting-list");
  });
}
