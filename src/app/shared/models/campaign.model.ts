import { any } from '@uirouter/angular';
// import { Utils } from '@shared/utils';
// import { Config } from '@shared/config';

export interface ICampaign {
    Id: string;
    Name: string;
    Description: string;
    Price: number;
    NoOfInfluencer: number;
    NoOfPosting: number;
    Charges1: number;
    Charges1Desc: string;
    Charges2: number;
    Charges2Desc: string;
    Charges3: number;
    Charges3Desc: string;
    TotalCost: number;
    PhotoIdList: number;
    TagIdList: string;
    IsActive: number;
    FromDate: string;
    ToDate: string;
    Running: any[];
    PhotoList: any[];
    FacebookStat: any[];
    Mode: string;

 };
 export class Campaign implements ICampaign {
    Id: string;
    Name: string;
    Description: string;
    Price: number;
    NoOfInfluencer: number;
    NoOfPosting: number;
    Charges1: number;
    Charges1Desc: string;
    Charges2: number;
    Charges2Desc: string;
    Charges3: number;
    Charges3Desc: string;
    TotalCost: number;
    PhotoIdList: number;
    TagIdList: string;
    IsActive: number;
    FromDate: string;
    ToDate: string;
    Running: any[];
    PhotoList: any[];
    FacebookStat: any[];
    Mode: string;
    
    constructor(campaign?: any) {
        this.Id = campaign && campaign.Id || '';
        this.Name = campaign && campaign.Name || '';
        this.Description = campaign && campaign.Description || '';
        this.Price = campaign && campaign.Price || null;
        this.NoOfInfluencer = campaign && campaign.NoOfInfluencer || 0;
        this.NoOfPosting = campaign && campaign.NoOfPosting || 0;
        this.TotalCost = campaign && campaign.TotalCost || 0;
        this.FromDate = campaign && campaign.FromDate || '';
        this.ToDate = campaign && campaign.ToDate || '';
        this.IsActive = campaign && campaign.IsActive || 1;
        this.Mode = campaign && campaign.Mode || 'ADD';
    }
 };