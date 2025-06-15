import { localizeDate } from "../util-fns";

export const journalEntriesText = {
    "en-US": {
        "Date": "Date",
        "Description": "Description",
        "Debit": "Debit",
        "Credit": "Credit",
        
        "Journal Entries": "Journal Entries",

        "Invalid date.": "Invalid date.",
        "Please provide a description for this entry.": "Please provide a description for this entry.",
        "Line-items must have a description.": "Line-items must have a description.",
        "Line-items must have either a debit or credit.": "Line-items must have either a debit or credit.",
        "Line-items must be assigned to an account.": "Line-items must be assigned to an account.",
        "Debits and Credits must balance.": "Debits and Credits must balance.",
        "Add an entry": "Add an entry",
        "Newer": "Newer",
        "Older": "Older",
        "Journal Entry": "Journal Entry",
        "Transaction": "Transaction",
        "Delete": "Delete",
        "Save": "Save",
        "Cancel": "Cancel",
        "Copy": "Copy",
        "Edit": "Edit",
        "Close": "Close",

        "Transaction must be assigned to an account.": "Transaction must be assigned to an account.",
        "Transaction must be given a description.": "Transaction must be given a description.",
        "Line-items must be assigned to an account or category.": "Line-items must be assigned to an account or category.",
        "Please provide an amount for each item.": "Please provide an amount for each item.",
        "Please specify a transaction type for each item.": "Please specify a transaction type for each item.",
        "Add a new transaction": "Add a new transaction",
        "Transaction must have at least one item.": "Transaction must have at least one item.",
        "Entry must have line-items.": "Entry must have line-items.",

        "View edit history": "View edit history",
        "[A] ": "[A] ",
        "[L] ": "[L] ",
        "[O] ": "[O] ",
        "[I] ": "[I] ",
        "[E] ": "[E] ",

        "Footer text": (pageIndex, pageSize, pageLength, totalElements) => "Showing " + ((pageIndex * pageSize) + 1) + "-" + ((pageIndex * pageSize) + pageLength) + " of " + totalElements + " results",

        "Successfully saved.": "Successfully saved.",
        "This action requires EDIT permissions for this ledger.": "This action requires EDIT permissions for this ledger.",
        "This journal entry has been locked by an admin of this ledger.": "This journal entry has been locked by an admin of this ledger.",
        "This transaction has been locked by an admin of this ledger.": "This transaction has been locked by an admin of this ledger.",
        "Journal entry date must not be before": (lockJournalEntriesBefore, locale) => `Journal entry date must not be before ${localizeDate(lockJournalEntriesBefore, locale)}.`,
        "Transaction date must not be before": (lockJournalEntriesBefore, locale) => `Transaction date must not be before ${localizeDate(lockJournalEntriesBefore, locale)}.`,
        "None": "None",

        "Memo": "Memo",
        "Account": "Account",
        "Total": "Total",
        "Transaction Type": "Transaction Type",
        "Category or Account": "Category or Account",
        "Amount": "Amount",
        "From Account": "From Account",
    
        "Edit History": "Edit History",
        "TIMESTAMP OF EDIT:": "TIMESTAMP OF EDIT:",
        "AUTHOR OF EDIT:": "AUTHOR OF EDIT:",
        
        "Total Debit": "Total Debit",
        "Total Credit": "Total Credit",
        "No memo": "No memo",

        "Vendor": "Vendor",
        "Customer": "Customer",

        "Add a Line Item": "Add a Line Item",
        "Copy description to line items": "Copy description to line items",
        "or": "or",

        "Inflow": "Inflow",
        "Outflow": "Outflow",
        "Transactions": "Transactions",

    },
    "zh-TW": {
        "Date": "日期",
        "Description": "描述",
        "Debit": "借方",
        "Credit": "貸方",

        "Journal Entries": "記帳分錄",

        "Invalid date.": "日期有誤。",
        "Please provide a description for this entry.": "請簡單描述一下這個分錄。",
        "Line-items must have a description.": "單行項目要有描述。",
        "Line-items must have either a debit or credit.": "單行項目至少要有一個借方金額或貸方金額。",
        "Line-items must be assigned to an account.": "單行項目要有科目。",
        "Debits and Credits must balance.": "借貸雙方金額必需要平衡。",
        "Add an entry": "新增分錄",
        "Newer": "上一頁（更晚的）",
        "Older": "下一頁（更早的）",
        "Journal Entry": "分錄",
        "Transaction": "交易",
        "Delete": "删除",
        "Save": "儲存",
        "Cancel": "取消",
        "Copy": "複製",
        "Edit": "修改",
        "Close": "關閉",

        "Transaction must be assigned to an account.": "交易紀錄必需要有針對的帳戶。",
        "Transaction must be given a description.": "交易記錄的「描述」欄不能空白不填。",
        "Line-items must be assigned to an account or category.": "單行項目必需要有針對的帳戶或類別。",
        "Please provide an amount for each item.": "請為每個項目記錄下交易金額。",
        "Please specify a transaction type for each item.": "請為每個單行項目指定其交易類別。",
        "Add a new transaction": "記錄一筆新交易",
        "Transaction must have at least one item.": "一筆交易記錄至少要有一個單行項目",
        "Entry must have line-items.": "一筆分錄至少要有一個單行項目",

        "View edit history": "檢視變更史",
        "[A] ": "[資產] ",
        "[L] ": "[負債] ",
        "[O] ": "[權益] ",
        "[I] ": "[收益] ",
        "[E] ": "[費損] ",

        "Footer text": (pageIndex, pageSize, pageLength, totalElements) => "顯示 " + ((pageIndex * pageSize) + 1) + "-" + ((pageIndex * pageSize) + pageLength) + " 筆" + "（共" + totalElements + "筆）",
        "Successfully saved.": "已成功儲存。",
        "This action requires EDIT permissions for this ledger.": "使用本功能需有編修者權限。",
        "This journal entry has been locked by an admin of this ledger.": "本分錄已被帳册管理者鎖定而不能被更改。",
        "This transaction has been locked by an admin of this ledger.": "本交易記錄已被帳册管理者鎖定而不能被更改。",
        "Journal entry date must not be before": (lockJournalEntriesBefore, locale) => `管理者有鎖定帳册，分錄日期不得早於 ${localizeDate(lockJournalEntriesBefore, locale)}.`, 
        "Transaction date must not be before": (lockJournalEntriesBefore, locale) => `管理者有鎖定帳册，交易記錄日期不得早於 ${localizeDate(lockJournalEntriesBefore, locale)}.`,
        "None": "無",

        "Memo": "註記",
        "Account": "科目／類別",
        "Total": "合計",

        "Transaction Type": "交易類別",
        "Category or Account": "類別或帳戶",
        "Amount": "金額",
        "From Account": "從哪個帳戶",

        "Edit History": "變更史",
        "TIMESTAMP OF EDIT:": "更動時間點",
        "AUTHOR OF EDIT:": "更動者",

        "Total Debit": "借方加總",
        "Total Credit": "貸方加總",
        "No memo": "無註記",

        "Vendor": "供應商（支出對象）",
        "Customer": "客戶（收入來源）",


        "Add a Line Item": "新增一行",
        "Copy description to line items": "複製「描述」到各個單行項目",        
        "or": "或",

        "Inflow": "流入",
        "Outflow": "流出",
        "Transactions": "帳戶交易記錄",

    }
}