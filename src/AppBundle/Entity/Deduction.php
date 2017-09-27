<?php
/*********************************************************************************
 * Developed by Maxx Ng'ang'a
 * (C) 2017 Crysoft Dynamics Ltd
 * Karbon V 2.1
 * User: Maxx
 * Date: 9/27/2017
 * Time: 5:51 PM
 ********************************************************************************/

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="deduction")
 */
class Deduction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="string")
     */
    private $id;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Employee")
     */
    private $employee;
    /**
     * @ORM\Column(type="string")
     */
    private $amount;
    /**
     * @ORM\Column(type="string")
     */
    private $deductionPeriod;
    /**
     * @ORM\Column(type="datetime")
     */
    private $deductedAt;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     */
    private $deductedBy;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getEmployee()
    {
        return $this->employee;
    }

    /**
     * @param mixed $employee
     */
    public function setEmployee($employee)
    {
        $this->employee = $employee;
    }

    /**
     * @return mixed
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param mixed $amount
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    /**
     * @return mixed
     */
    public function getDeductionPeriod()
    {
        return $this->deductionPeriod;
    }

    /**
     * @param mixed $deductionPeriod
     */
    public function setDeductionPeriod($deductionPeriod)
    {
        $this->deductionPeriod = $deductionPeriod;
    }

    /**
     * @return mixed
     */
    public function getDeductedAt()
    {
        return $this->deductedAt;
    }

    /**
     * @param mixed $deductedAt
     */
    public function setDeductedAt($deductedAt)
    {
        $this->deductedAt = $deductedAt;
    }

    /**
     * @return mixed
     */
    public function getDeductedBy()
    {
        return $this->deductedBy;
    }

    /**
     * @param mixed $deductedBy
     */
    public function setDeductedBy($deductedBy)
    {
        $this->deductedBy = $deductedBy;
    }

}