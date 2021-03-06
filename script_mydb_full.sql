USE [master]
GO
/****** Object:  Database [mydb]    Script Date: 8/27/2017 9:51:35 AM ******/
CREATE DATABASE [mydb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'mydb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\mydb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'mydb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\mydb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [mydb] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [mydb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [mydb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [mydb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [mydb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [mydb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [mydb] SET ARITHABORT OFF 
GO
ALTER DATABASE [mydb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [mydb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [mydb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [mydb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [mydb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [mydb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [mydb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [mydb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [mydb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [mydb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [mydb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [mydb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [mydb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [mydb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [mydb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [mydb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [mydb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [mydb] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [mydb] SET  MULTI_USER 
GO
ALTER DATABASE [mydb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [mydb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [mydb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [mydb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [mydb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [mydb] SET QUERY_STORE = OFF
GO
USE [mydb]
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [mydb]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[AddressId] [int] IDENTITY(1,1) NOT NULL,
	[CityId] [int] NOT NULL,
	[StateId] [int] NOT NULL,
	[CountryId] [int] NOT NULL,
	[HouseNo] [varchar](50) NULL,
	[Long] [varchar](50) NULL,
	[Lati] [varchar](50) NULL,
	[ZipCode] [varchar](50) NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Category]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[SubCategoryId] [int] NULL,
	[CategoryName] [varchar](50) NULL,
	[Description] [varchar](50) NULL,
	[Image] [varbinary](max) NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[City]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[CityId] [int] IDENTITY(1,1) NOT NULL,
	[StateId] [int] NULL,
	[Name] [varchar](50) NULL,
	[Description] [varchar](50) NULL,
 CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED 
(
	[CityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Country]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[CountryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Description] [varchar](100) NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[CountryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CustomerAccount]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerAccount](
	[CustomerAccId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NOT NULL,
	[Username] [varchar](90) NOT NULL,
	[Password] [varchar](90) NULL,
	[HintQue] [varchar](100) NULL,
	[Answer] [varchar](100) NULL,
	[Active] [varchar](90) NULL,
 CONSTRAINT [PK_CustomerAccount] PRIMARY KEY CLUSTERED 
(
	[CustomerAccId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Customers]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerId] [int] IDENTITY(1,1) NOT NULL,
	[AddressId] [int] NOT NULL,
	[FirstName] [varchar](50) NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[MobileNo] [varchar](50) NULL,
	[Phone] [varchar](50) NULL,
	[Gender] [varchar](50) NULL,
	[EmailId] [varchar](50) NULL,
	[Description] [varchar](80) NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Offer]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Offer](
	[OfferId] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[Description] [varchar](50) NULL,
	[Active] [varchar](50) NULL,
	[OfferPrice] [varchar](50) NULL,
	[OfferStartDate] [date] NULL,
	[OfferEndDate] [date] NULL,
	[Remaining] [int] NULL,
 CONSTRAINT [PK_Offer] PRIMARY KEY CLUSTERED 
(
	[OfferId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Order]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NULL,
	[AddressId] [int] NULL,
	[DeliveryCharge] [int] NULL,
	[Discount] [int] NULL,
	[TaxAmount] [int] NULL,
	[NetAmount] [int] NULL,
	[OrderDate] [date] NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[OrderDetailId] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[OrderId] [int] NULL,
	[ProductPrice] [int] NULL,
	[Quantity] [int] NULL,
	[Discount] [int] NULL,
	[Tax] [int] NULL,
	[Total] [int] NULL,
	[Active] [varchar](50) NULL,
 CONSTRAINT [PK_OrderDetails] PRIMARY KEY CLUSTERED 
(
	[OrderDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OrderPayment]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderPayment](
	[OPId] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NULL,
	[PaymentId] [int] NULL,
	[PaymentType] [varchar](50) NULL,
	[Date] [date] NULL,
	[Status] [varchar](50) NULL,
 CONSTRAINT [PK_OrderPayment] PRIMARY KEY CLUSTERED 
(
	[OPId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OrderStatus]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderStatus](
	[StatusId] [int] NOT NULL,
	[OrderId] [int] NOT NULL,
	[OSName] [varchar](90) NULL,
	[Description] [varchar](100) NULL,
	[Active] [varchar](90) NULL,
 CONSTRAINT [PK_OrderStatus] PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Payment]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[PaymentId] [int] IDENTITY(1,1) NOT NULL,
	[O1] [varchar](50) NULL,
	[O2] [varchar](50) NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[PaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProductRating]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductRating](
	[ProductRatingId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NOT NULL,
	[Name] [varchar](50) NULL,
	[Image] [varbinary](max) NULL,
	[Description] [varchar](50) NULL,
	[Active] [varbinary](50) NULL,
 CONSTRAINT [PK_ProductRating] PRIMARY KEY CLUSTERED 
(
	[ProductRatingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Products]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[SubCategoryId] [int] NULL,
	[SupplierId] [int] NOT NULL,
	[ProductName] [varchar](50) NULL,
	[PurchasePrice] [varchar](50) NULL,
	[SalesPrice] [varchar](50) NULL,
	[Quantity] [int] NULL,
	[ReorderLevel] [int] NULL,
	[DiscountAvailable] [int] NULL,
	[Stock] [int] NULL,
	[Color] [varchar](50) NULL,
	[Size] [varchar](50) NULL,
	[Other1] [varchar](50) NULL,
	[Other2] [varchar](50) NULL,
	[ImageByte] [image] NULL,
	[ImagePath] [nvarchar](500) NULL,
	[ImageTitle] [nvarchar](500) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ShoppingCart]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShoppingCart](
	[CartId] [int] NOT NULL,
	[ProductId] [int] NULL,
	[CustomerId] [int] NULL,
	[CategoryId] [int] NULL,
	[SubCategoryId] [varchar](50) NULL,
	[Date] [date] NULL,
	[Quantity] [int] NULL,
	[Price] [int] NOT NULL,
 CONSTRAINT [PK_ShoppingCart] PRIMARY KEY CLUSTERED 
(
	[CartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[State]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[State](
	[StateId] [int] IDENTITY(1,1) NOT NULL,
	[CountryId] [int] NOT NULL,
	[StateName] [varchar](100) NOT NULL,
	[Description] [varchar](100) NULL,
 CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED 
(
	[StateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SubCategory]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCategory](
	[SubCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[SubCatName] [varchar](50) NULL,
	[Description] [varchar](100) NULL,
	[Image] [varbinary](max) NULL,
 CONSTRAINT [PK_SubCategory] PRIMARY KEY CLUSTERED 
(
	[SubCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Supplier]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supplier](
	[SupplierId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [varchar](100) NULL,
	[ContactNo1] [int] NULL,
	[ContactNo2] [varchar](80) NULL,
	[EmailId] [varchar](50) NULL,
	[Address1] [varchar](50) NULL,
	[Address2] [varchar](50) NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[DiscountType] [varchar](50) NULL,
	[GoodsType] [varchar](50) NULL,
	[DiscountAmount] [int] NULL,
	[CurrentOrder] [int] NULL,
	[PaymentMethod] [varchar](100) NULL,
	[AccountNumber] [varchar](50) NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[SupplierId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[WishList]    Script Date: 8/27/2017 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WishList](
	[WishListId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NULL,
	[ProductId] [int] NULL,
	[InsertDate] [date] NULL,
	[Image] [image] NULL,
 CONSTRAINT [PK_WishList] PRIMARY KEY CLUSTERED 
(
	[WishListId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Address] ON 

INSERT [dbo].[Address] ([AddressId], [CityId], [StateId], [CountryId], [HouseNo], [Long], [Lati], [ZipCode]) VALUES (2, 1, 1, 1, N'20300', N'27.699758', N'85.33859', N'42000')
INSERT [dbo].[Address] ([AddressId], [CityId], [StateId], [CountryId], [HouseNo], [Long], [Lati], [ZipCode]) VALUES (3, 1, 1, 1, N'32000', N'27.703547', N'85.322613', N'42001')
INSERT [dbo].[Address] ([AddressId], [CityId], [StateId], [CountryId], [HouseNo], [Long], [Lati], [ZipCode]) VALUES (4, 3, 3, 6, N'43000', N'43.23332', N'90.2332', N'32000')
INSERT [dbo].[Address] ([AddressId], [CityId], [StateId], [CountryId], [HouseNo], [Long], [Lati], [ZipCode]) VALUES (5, 4, 5, 6, N'32000', N'44.34343', N'91.0043', N'43032')
INSERT [dbo].[Address] ([AddressId], [CityId], [StateId], [CountryId], [HouseNo], [Long], [Lati], [ZipCode]) VALUES (9, 3, 3, 6, N'4236', N'27.3434', N'85.3222', N'42000')
SET IDENTITY_INSERT [dbo].[Address] OFF
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([CategoryId], [SubCategoryId], [CategoryName], [Description], [Image]) VALUES (1, 1, N'Hair Band', N'Hair Band made in Herzogenaurach, Germany', NULL)
INSERT [dbo].[Category] ([CategoryId], [SubCategoryId], [CategoryName], [Description], [Image]) VALUES (3, 2, N'Cap', N'Ladies Hair Cap', NULL)
INSERT [dbo].[Category] ([CategoryId], [SubCategoryId], [CategoryName], [Description], [Image]) VALUES (4, 1, N'Ear RIngs', N'Ladies Ear Rings', NULL)
INSERT [dbo].[Category] ([CategoryId], [SubCategoryId], [CategoryName], [Description], [Image]) VALUES (5, 2, N'Hand Band', N'Gents Hand Band', NULL)
INSERT [dbo].[Category] ([CategoryId], [SubCategoryId], [CategoryName], [Description], [Image]) VALUES (6, 5, N'Mobile Accessores', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[City] ON 

INSERT [dbo].[City] ([CityId], [StateId], [Name], [Description]) VALUES (1, 1, N'Old Baneshwor', N'Devkota Sadak, Apex')
INSERT [dbo].[City] ([CityId], [StateId], [Name], [Description]) VALUES (2, 1, N'Putalisadak', N'Shiva Galli')
INSERT [dbo].[City] ([CityId], [StateId], [Name], [Description]) VALUES (3, 3, N'Bandra', N'Six Alwares House')
INSERT [dbo].[City] ([CityId], [StateId], [Name], [Description]) VALUES (4, 5, N'Bandaar', N'Khao Galli')
INSERT [dbo].[City] ([CityId], [StateId], [Name], [Description]) VALUES (6, 6, N'Chong', N'Lies in Beging')
SET IDENTITY_INSERT [dbo].[City] OFF
SET IDENTITY_INSERT [dbo].[Country] ON 

INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (1, N'Nepal', N'Somewhere betn china and India')
INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (6, N'India', NULL)
INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (7, N'China', NULL)
INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (8, N'Thiland', NULL)
INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (9, N'Japan', NULL)
INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (10, N'Australia', NULL)
INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (11, N'USA', NULL)
INSERT [dbo].[Country] ([CountryId], [Name], [Description]) VALUES (12, N'UK', NULL)
SET IDENTITY_INSERT [dbo].[Country] OFF
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([CustomerId], [AddressId], [FirstName], [MiddleName], [LastName], [MobileNo], [Phone], [Gender], [EmailId], [Description]) VALUES (3, 2, N'Umanga', N'Singh', N'Bhattarai', N'9845394777', N'432300', N'Male', N'umang@hotmail.com', N'I am student blaa')
INSERT [dbo].[Customers] ([CustomerId], [AddressId], [FirstName], [MiddleName], [LastName], [MobileNo], [Phone], [Gender], [EmailId], [Description]) VALUES (4, 3, N'Prithivi', N'Narayan', N'Shah', N'9842364722', N'238990', N'Male', N'prithivi@gmail.com', NULL)
INSERT [dbo].[Customers] ([CustomerId], [AddressId], [FirstName], [MiddleName], [LastName], [MobileNo], [Phone], [Gender], [EmailId], [Description]) VALUES (6, 5, N'Bibek', N'Ratna', N'Bajracharya', N'9843234322', N'423020', N'Male`', N'bibek@gmail.com', N'I am Programer')
SET IDENTITY_INSERT [dbo].[Customers] OFF
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([OrderId], [CustomerId], [AddressId], [DeliveryCharge], [Discount], [TaxAmount], [NetAmount], [OrderDate]) VALUES (8, 6, 5, 500, 10, 13, 549, CAST(N'2017-01-01' AS Date))
INSERT [dbo].[Order] ([OrderId], [CustomerId], [AddressId], [DeliveryCharge], [Discount], [TaxAmount], [NetAmount], [OrderDate]) VALUES (9, 3, 2, 800, 10, 14, 649, CAST(N'2017-01-01' AS Date))
INSERT [dbo].[Order] ([OrderId], [CustomerId], [AddressId], [DeliveryCharge], [Discount], [TaxAmount], [NetAmount], [OrderDate]) VALUES (10, 4, 5, 900, 12, 15, 849, CAST(N'2017-05-06' AS Date))
SET IDENTITY_INSERT [dbo].[Order] OFF
SET IDENTITY_INSERT [dbo].[OrderDetails] ON 

INSERT [dbo].[OrderDetails] ([OrderDetailId], [ProductId], [OrderId], [ProductPrice], [Quantity], [Discount], [Tax], [Total], [Active]) VALUES (4, 5, 8, 500, 10, 15, 13, 559, N'Yes')
INSERT [dbo].[OrderDetails] ([OrderDetailId], [ProductId], [OrderId], [ProductPrice], [Quantity], [Discount], [Tax], [Total], [Active]) VALUES (6, 5, 9, 500, 10, 500, 585, 4415, N'Yes')
INSERT [dbo].[OrderDetails] ([OrderDetailId], [ProductId], [OrderId], [ProductPrice], [Quantity], [Discount], [Tax], [Total], [Active]) VALUES (9, 12, 10, 500, 12, 600, 540, 5940, N'Yes')
SET IDENTITY_INSERT [dbo].[OrderDetails] OFF
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([ProductId], [CategoryId], [SubCategoryId], [SupplierId], [ProductName], [PurchasePrice], [SalesPrice], [Quantity], [ReorderLevel], [DiscountAvailable], [Stock], [Color], [Size], [Other1], [Other2], [ImageByte], [ImagePath], [ImageTitle]) VALUES (5, 1, 1, 1, N'Hair Band', N'50000', N'5000', 23, 24, 25, 26, N'Black', N'35', N'Blaa', N'Blaaaaaa', NULL, NULL, NULL)
INSERT [dbo].[Products] ([ProductId], [CategoryId], [SubCategoryId], [SupplierId], [ProductName], [PurchasePrice], [SalesPrice], [Quantity], [ReorderLevel], [DiscountAvailable], [Stock], [Color], [Size], [Other1], [Other2], [ImageByte], [ImagePath], [ImageTitle]) VALUES (12, 3, 2, 7, N'Ladies Hair Cap', N'500', N'800', 10, 30, 0, 40, N'Black', N'32', N'Blaa', N'Blaaba', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Products] OFF
SET IDENTITY_INSERT [dbo].[State] ON 

INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (1, 1, N'Newa State', NULL)
INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (2, 1, N'Limbuwan State', NULL)
INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (3, 6, N'Banglore', NULL)
INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (4, 6, N'Kerela', NULL)
INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (5, 6, N'Delhi', NULL)
INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (6, 7, N'Beging', NULL)
INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (7, 7, N'Sanghai', NULL)
INSERT [dbo].[State] ([StateId], [CountryId], [StateName], [Description]) VALUES (9, 9, N'Hondang', N'Somewhere in Japan')
SET IDENTITY_INSERT [dbo].[State] OFF
SET IDENTITY_INSERT [dbo].[SubCategory] ON 

INSERT [dbo].[SubCategory] ([SubCategoryId], [SubCatName], [Description], [Image]) VALUES (1, N'Ladies', N'Addidas Hair Brand ', NULL)
INSERT [dbo].[SubCategory] ([SubCategoryId], [SubCatName], [Description], [Image]) VALUES (2, N'Gents', N'Nike Cap', NULL)
INSERT [dbo].[SubCategory] ([SubCategoryId], [SubCatName], [Description], [Image]) VALUES (5, N'Tochscreen', N'Mobile Acce', NULL)
INSERT [dbo].[SubCategory] ([SubCategoryId], [SubCatName], [Description], [Image]) VALUES (6, N'Mobile Camera Stand', N'Mobile Accessories', NULL)
INSERT [dbo].[SubCategory] ([SubCategoryId], [SubCatName], [Description], [Image]) VALUES (7, N'Mobile Cover', N'Mobile Accessories', NULL)
SET IDENTITY_INSERT [dbo].[SubCategory] OFF
SET IDENTITY_INSERT [dbo].[Supplier] ON 

INSERT [dbo].[Supplier] ([SupplierId], [CompanyName], [ContactNo1], [ContactNo2], [EmailId], [Address1], [Address2], [City], [State], [Country], [DiscountType], [GoodsType], [DiscountAmount], [CurrentOrder], [PaymentMethod], [AccountNumber]) VALUES (1, N'Adidas', 983232323, N'415100000', N'adidas@gmail.com', N'Herzogenaurach', N'Met Street', N'Herz', N'Noling', N'Germany', N'Cash', N'Accessories', 5000, 70, N'Card', N'3434343432569034003')
INSERT [dbo].[Supplier] ([SupplierId], [CompanyName], [ContactNo1], [ContactNo2], [EmailId], [Address1], [Address2], [City], [State], [Country], [DiscountType], [GoodsType], [DiscountAmount], [CurrentOrder], [PaymentMethod], [AccountNumber]) VALUES (2, N'Nike', 982323232, N'4299239923', N'nike@hotmail.com', N'Nikee, Blaa', N'New Life Street', N'ReIncarnation', N'New Babe', N'Lost', N'Credit', N'Accessories', 500, 60, N'Paypal', N'34958390583095')
INSERT [dbo].[Supplier] ([SupplierId], [CompanyName], [ContactNo1], [ContactNo2], [EmailId], [Address1], [Address2], [City], [State], [Country], [DiscountType], [GoodsType], [DiscountAmount], [CurrentOrder], [PaymentMethod], [AccountNumber]) VALUES (5, N'Yongbo', 234234242, N'23984764', N'yong@hotmail.com', N'blaaaaa', N'BlaBlaaa', N'Haaaa', N'Hoooo', N'China', N'Cash', N'Swimming Cap', 5000, 50, N'Credit', N'2304982094829048')
INSERT [dbo].[Supplier] ([SupplierId], [CompanyName], [ContactNo1], [ContactNo2], [EmailId], [Address1], [Address2], [City], [State], [Country], [DiscountType], [GoodsType], [DiscountAmount], [CurrentOrder], [PaymentMethod], [AccountNumber]) VALUES (6, N'Puma', 343434, N'588585858', N'puma@hotmail.com', N'Hungbo', N'Sunang', N'Kamhaa', N'Kahaa', N'Germany', N'Credit', N'Band', 5000, 80, N'Cash', N'304034909')
INSERT [dbo].[Supplier] ([SupplierId], [CompanyName], [ContactNo1], [ContactNo2], [EmailId], [Address1], [Address2], [City], [State], [Country], [DiscountType], [GoodsType], [DiscountAmount], [CurrentOrder], [PaymentMethod], [AccountNumber]) VALUES (7, N'Seal Pvt Ltd', 2323, N'234242432', N'seal@gmail.com', N'Kongban street', N'Choyang', N'Hongbo', N'Sanghai', N'China', N'Credit', N'Swimming Glass', 80000, 60, N'Credit', N'340349034930490')
SET IDENTITY_INSERT [dbo].[Supplier] OFF
SET IDENTITY_INSERT [dbo].[WishList] ON 

INSERT [dbo].[WishList] ([WishListId], [CustomerId], [ProductId], [InsertDate], [Image]) VALUES (1, 3, 5, CAST(N'2017-01-01' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[WishList] OFF
ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_City] FOREIGN KEY([CityId])
REFERENCES [dbo].[City] ([CityId])
GO
ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_City]
GO
ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_Country] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_Country]
GO
ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_State] FOREIGN KEY([StateId])
REFERENCES [dbo].[State] ([StateId])
GO
ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_State]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_SubCategory] FOREIGN KEY([SubCategoryId])
REFERENCES [dbo].[SubCategory] ([SubCategoryId])
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_SubCategory]
GO
ALTER TABLE [dbo].[City]  WITH CHECK ADD  CONSTRAINT [FK_City_State] FOREIGN KEY([CityId])
REFERENCES [dbo].[State] ([StateId])
GO
ALTER TABLE [dbo].[City] CHECK CONSTRAINT [FK_City_State]
GO
ALTER TABLE [dbo].[CustomerAccount]  WITH CHECK ADD  CONSTRAINT [FK_CustomerAccount_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[CustomerAccount] CHECK CONSTRAINT [FK_CustomerAccount_Customers]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [FK_Customers_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [FK_Customers_Address]
GO
ALTER TABLE [dbo].[Offer]  WITH CHECK ADD  CONSTRAINT [FK_Offer_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[Offer] CHECK CONSTRAINT [FK_Offer_Products]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Address]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Customers]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([OrderId])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Order]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Products]
GO
ALTER TABLE [dbo].[OrderPayment]  WITH CHECK ADD  CONSTRAINT [FK_OrderPayment_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([OrderId])
GO
ALTER TABLE [dbo].[OrderPayment] CHECK CONSTRAINT [FK_OrderPayment_Order]
GO
ALTER TABLE [dbo].[OrderPayment]  WITH CHECK ADD  CONSTRAINT [FK_OrderPayment_Payment] FOREIGN KEY([PaymentId])
REFERENCES [dbo].[Payment] ([PaymentId])
GO
ALTER TABLE [dbo].[OrderPayment] CHECK CONSTRAINT [FK_OrderPayment_Payment]
GO
ALTER TABLE [dbo].[OrderStatus]  WITH CHECK ADD  CONSTRAINT [FK_OrderStatus_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([OrderId])
GO
ALTER TABLE [dbo].[OrderStatus] CHECK CONSTRAINT [FK_OrderStatus_Order]
GO
ALTER TABLE [dbo].[ProductRating]  WITH CHECK ADD  CONSTRAINT [FK_ProductRating_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[ProductRating] CHECK CONSTRAINT [FK_ProductRating_Customers]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Category]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_SubCategory] FOREIGN KEY([SubCategoryId])
REFERENCES [dbo].[SubCategory] ([SubCategoryId])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_SubCategory]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Supplier] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Supplier] ([SupplierId])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Supplier]
GO
ALTER TABLE [dbo].[ShoppingCart]  WITH CHECK ADD  CONSTRAINT [FK_ShoppingCart_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
GO
ALTER TABLE [dbo].[ShoppingCart] CHECK CONSTRAINT [FK_ShoppingCart_Category]
GO
ALTER TABLE [dbo].[ShoppingCart]  WITH CHECK ADD  CONSTRAINT [FK_ShoppingCart_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[ShoppingCart] CHECK CONSTRAINT [FK_ShoppingCart_Customers]
GO
ALTER TABLE [dbo].[ShoppingCart]  WITH CHECK ADD  CONSTRAINT [FK_ShoppingCart_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[ShoppingCart] CHECK CONSTRAINT [FK_ShoppingCart_Products]
GO
ALTER TABLE [dbo].[State]  WITH CHECK ADD  CONSTRAINT [FK_State_Country] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Country] ([CountryId])
GO
ALTER TABLE [dbo].[State] CHECK CONSTRAINT [FK_State_Country]
GO
ALTER TABLE [dbo].[WishList]  WITH CHECK ADD  CONSTRAINT [FK_WishList_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[WishList] CHECK CONSTRAINT [FK_WishList_Customers]
GO
ALTER TABLE [dbo].[WishList]  WITH CHECK ADD  CONSTRAINT [FK_WishList_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[WishList] CHECK CONSTRAINT [FK_WishList_Products]
GO
USE [master]
GO
ALTER DATABASE [mydb] SET  READ_WRITE 
GO
