<?php
/*********************************************************************************
 * Developed by Maxx Ng'ang'a
 * (C) 2017 Crysoft Dynamics Ltd
 * Karbon V 2.1
 * User: Maxx
 * Date: 9/27/2017
 * Time: 5:46 PM
 ********************************************************************************/

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="salary")
 */
class Salary
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
    private $salaryPeriod;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     */
    private $runBy;
    /**
     * @ORM\Column(type="datetime")
     */
    private $runAt;

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
    public function getSalaryPeriod()
    {
        return $this->salaryPeriod;
    }

    /**
     * @param mixed $salaryPeriod
     */
    public function setSalaryPeriod($salaryPeriod)
    {
        $this->salaryPeriod = $salaryPeriod;
    }

    /**
     * @return mixed
     */
    public function getRunBy()
    {
        return $this->runBy;
    }

    /**
     * @param mixed $runBy
     */
    public function setRunBy($runBy)
    {
        $this->runBy = $runBy;
    }

    /**
     * @return mixed
     */
    public function getRunAt()
    {
        return $this->runAt;
    }

    /**
     * @param mixed $runAt
     */
    public function setRunAt($runAt)
    {
        $this->runAt = $runAt;
    }

}